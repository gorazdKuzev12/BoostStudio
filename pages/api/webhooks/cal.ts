import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import crypto from 'crypto'

// Disable body parsing - we need raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}

// Helper to get raw body
async function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      resolve(data)
    })
    req.on('error', reject)
  })
}

// ✅ Helper: Verify that the message actually came from Cal.com
function verifySignature(payload: string, signature: string | null, secret: string | undefined): boolean {
  if (!signature || !secret) return false

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  // Prevent timing attacks and handle different buffer lengths safely
  const sigBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)
  if (sigBuffer.length !== expectedBuffer.length) return false
  return crypto.timingSafeEqual(sigBuffer, expectedBuffer)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔔 WEBHOOK HIT! Cal.com webhook received')

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // 1. Get RAW text body first (Needed for hash verification)
  const rawBody = await getRawBody(req)
  console.log('📦 Raw body received, length:', rawBody.length)

  // 2. Parse the body
  let body
  try {
    body = JSON.parse(rawBody)
  } catch (e) {
    return res.status(400).json({ message: 'Invalid JSON' })
  }

  const { triggerEvent, payload } = body
  console.log('📌 Event:', triggerEvent)

  // 3. IGNORE NON-BOOKING EVENTS FIRST
  if (triggerEvent !== 'BOOKING_CREATED') {
    return res.status(200).json({ message: 'Event ignored' })
  }

  // 🔒 4. VERIFY THE SECRET (CRITICAL SECURITY)
  const signature = req.headers['x-cal-signature-256'] as string | undefined
  const secret = process.env.CAL_WEBHOOK_SECRET

  // TEMPORARY: Skip verification for testing (remove in production!)
  if (secret) {
    const isValid = verifySignature(rawBody, signature || null, secret)
    if (!isValid) {
      console.error('❌ Invalid Webhook Signature. Potential Hacker.')
      return res.status(401).json({ message: 'Invalid signature' })
    }
  } else {
    console.warn('⚠️ CAL_WEBHOOK_SECRET not set - skipping signature verification (DEV MODE)')
  }

  // --- LOGIC STARTS HERE ---
  const {
    id: calBookingId,
    uid: calUid,
    title: serviceName,
    startTime,
    endTime,
    responses,
    attendees,
    organizer,
  } = payload

  const clientInfo = attendees[0]
  console.log('👤 Client:', clientInfo?.name, '| Organizer:', organizer?.email)

  try {
    // 2. FIND SALON via ORGANIZER EMAIL
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('salon_id')
      .eq('email', organizer.email)
      .single()

    if (!profile) {
      console.error(`Stylist not found for email: ${organizer.email}`)
      return res.status(404).json({ error: 'Stylist not found' })
    }

    const salonId = profile.salon_id
    console.log('🏪 Salon ID:', salonId)

    // 3. UPSERT CLIENT
    const clientPhone = clientInfo.phoneNumber

    const { data: client, error: clientError } = await supabaseAdmin
      .from('clients')
      .upsert(
        {
          salon_id: salonId,
          full_name: clientInfo.name,
          email: clientInfo.email,
          phone: clientPhone,
        },
        { onConflict: 'salon_id, phone' }
      )
      .select()
      .single()

    if (clientError) console.error('Client DB Error', clientError)

    // 4. INSERT BOOKING
    const { error: bookingError } = await supabaseAdmin.from('bookings').insert({
      salon_id: salonId,
      client_id: client?.id,
      cal_booking_id: calBookingId,
      cal_uid: calUid,
      service_name: serviceName,
      start_time: startTime,
      end_time: endTime,
      status: 'confirmed',
      price: 0,
    })

    if (bookingError) throw bookingError

    console.log('✅ Booking synced successfully!')
    return res.status(200).json({ message: 'Booking Synced' })
  } catch (error) {
    console.error('Webhook Handler Failed:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

