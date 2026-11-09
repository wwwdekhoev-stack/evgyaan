import { NextResponse } from 'next/server';

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

const GUIDE_GROUPS = [
  '188241149758014563', // EV Guide Subscribers
  '188242275223996154', // electric cars lead
];

// Article-page signups are a different intent from the lead-magnet pages:
// those people asked for the buying guide, these asked for the monthly
// sales data. Set MAILERLITE_NEWSLETTER_GROUP in Vercel to a dedicated
// MailerLite group and they'll be kept apart; until then they fall back to
// the existing groups so no signup is dropped on the floor.
const NEWSLETTER_GROUPS = process.env.MAILERLITE_NEWSLETTER_GROUP
  ? [process.env.MAILERLITE_NEWSLETTER_GROUP]
  : GUIDE_GROUPS;

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = (body.email || '').trim().toLowerCase();

    // Honeypot. The forms render a hidden `company` field that no person
    // sees; bots fill everything. Return 200 rather than an error so the
    // bot can't tell it was filtered - it just never reaches MailerLite.
    if (body.company) {
      return NextResponse.json({ success: true });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Only accept posts that came from our own pages. Not CSRF protection
    // (there's no session here) - it's the cheapest filter against scripted
    // signup floods that would burn the MailerLite quota and poison the
    // list, which hurts deliverability for real subscribers.
    const origin = request.headers.get('origin');
    if (origin) {
      const { hostname } = new URL(origin);
      const allowed =
        hostname === 'evgyan.com' ||
        hostname === 'www.evgyan.com' ||
        hostname === 'localhost' ||
        hostname.endsWith('.vercel.app');
      if (!allowed) {
        console.warn('[ev-guide-subscribe] rejected origin:', origin);
        return NextResponse.json({ message: 'Forbidden.' }, { status: 403 });
      }
    }

    const groups = body.source === 'article' ? NEWSLETTER_GROUPS : GUIDE_GROUPS;

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
      body: JSON.stringify({ email, groups, status: 'active' }),
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
