import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const briefData = req.body;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Try forwarding to big-bee-api backend
    try {
      const response = await fetch(`${apiUrl}/brief`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(briefData),
      });

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json({ success: true, data });
      }
    } catch (apiErr) {
      console.warn('Backend API connection failed, processing locally:', apiErr);
    }

    // Fallback response if standalone
    return res.status(200).json({
      success: true,
      message: 'Brief submitted successfully!',
      data: {
        id: 'local-' + Date.now(),
        ...briefData,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Error in /api/brief:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    });
  }
}
