// API helpers — point REACT_APP_API_URL at your Vercel backend in production.
// Falls back to relative paths so `vercel dev` works locally.
const BASE = process.env.REACT_APP_API_URL ?? '';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContact(data: ContactPayload): Promise<void> {
  const res = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Contact submission failed');
}

export async function trackResumeDownload(): Promise<void> {
  await fetch(`${BASE}/api/resume`, { method: 'POST' }).catch(() => {
    // fire-and-forget — don't block the user
  });
}

export async function incrementViewCount(): Promise<number> {
  try {
    const res = await fetch(`${BASE}/api/analytics`, { method: 'POST' });
    const data = await res.json();
    return data.views ?? 0;
  } catch {
    return 0;
  }
}
