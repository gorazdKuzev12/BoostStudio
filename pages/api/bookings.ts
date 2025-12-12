import type { NextApiRequest, NextApiResponse } from 'next'

// Cal.com API key - In production, move this to environment variables!
const CAL_API_KEY = 'cal_live_2c8e1a7704ef36a92059228f6d27abf3'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Fetch bookings from Cal.com API
    const response = await fetch('https://api.cal.com/v1/bookings?apiKey=' + CAL_API_KEY, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Cal.com API error:', errorData)
      return res.status(response.status).json({ error: 'Failed to fetch bookings from Cal.com' })
    }

    const data = await response.json()
    
    // Transform Cal.com bookings to our format
    const bookings = data.bookings?.map((booking: any) => ({
      id: booking.id,
      clientName: booking.attendees?.[0]?.name || 'Unknown',
      email: booking.attendees?.[0]?.email || '',
      phone: booking.attendees?.[0]?.phone || '',
      service: booking.title || booking.eventType?.title || '15 Min Consultation',
      date: booking.startTime ? new Date(booking.startTime).toISOString().split('T')[0] : '',
      time: booking.startTime ? new Date(booking.startTime).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }) : '',
      status: booking.status?.toLowerCase() || 'pending',
      startTime: booking.startTime,
      endTime: booking.endTime,
    })) || []

    return res.status(200).json({ bookings })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

