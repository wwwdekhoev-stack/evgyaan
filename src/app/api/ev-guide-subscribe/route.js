import { NextResponse } from 'next/server';

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

const GROUPS = [
  '188241149758014563', // EV Guide Subscribers
  '188242275223996154', // electric cars lead
];

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!MAILERLITE_API_KEY) {
      console.error('[ev-guide-subscribe] MAILERLITE_API_KEY not set');
      return NextResponse.json(
        { message: 'Server configuration error.' },
        { status: 500 }
      );
    }

    const mlRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({ email, groups: GROUPS, status: 'active' }),
    });

    if (mlRes.ok) {
      return NextResponse.json({ success: true });
    }

    const mlError = await mlRes.json().catch(() => ({}));
    console.error('[ev-guide-subscribe] MailerLite error:', mlRes.status, mlError);
    return NextResponse.json(
      { message: 'Could not subscribe. Please try again.' },
      { status: 500 }
    );
  } catch (err) {
    console.error('[ev-guide-subscribe] Error:', err);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
