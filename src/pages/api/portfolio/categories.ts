import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  try {
    const response = await fetch(`${apiUrl}/portfolio/categories`);
    if (response.ok) {
      const data = await response.json();
      return res.status(200).json({ success: true, data });
    }
  } catch (apiErr) {
    console.warn('Portfolio API call failed, falling back to empty list:', apiErr);
  }

  return res.status(200).json({ success: true, data: [] });
}
