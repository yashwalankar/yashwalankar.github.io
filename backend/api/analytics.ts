import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory mock — replace with a real store (e.g. Upstash Redis, PlanetScale, Vercel KV)
let views = 0;

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json({ views });
  }

  if (req.method === 'POST') {
    // TODO: Persist to a real DB — serverless functions are stateless, in-memory resets each cold start
    views += 1;
    return res.status(200).json({ views });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
