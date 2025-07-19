import 'dotenv/config';
import { Resend } from 'resend';
import { env } from '../utils/env';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendContactEmail({ subject, html }: { subject: string; html: string }) {
  return resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: [env.RESEND_TO_EMAIL],
    subject,
    html,
  });
}
