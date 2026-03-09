import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key
// NOTE: We wrap this in a try-catch for the dev environment in case the key isn't provided yet.
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, eventType, eventDate, message } = data;

    if (!resend) {
      console.warn('Resend API key is missing. Simulation mode: Email not sent but returning success.');
      return NextResponse.json({ success: true, simulated: true });
    }

    const inquiryRecipient = process.env.INQUIRY_TO_EMAIL || 'kira@kirajiaevents.com';

    const { data: emailData, error } = await resend.emails.send({
      from: 'Kira Jia Events Inquiry <inquiry@kirajiaevents.com>', // MUST BE VERIFIED IN RESEND
      to: [inquiryRecipient],
      subject: `New Inquiry from ${name} - ${eventType}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Event Date:</strong> ${eventDate || 'Not specified'}</p>
        <br/>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: emailData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send inquiry.' }, { status: 500 });
  }
}
