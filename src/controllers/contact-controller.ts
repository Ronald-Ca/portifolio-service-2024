import { Request, Response } from 'express';
import { contactSchema } from '../zod-validations/global/contact';
import { canSendContactRequest, registerContactRequest } from '../services/contact-request-service';
import { sendContactEmail } from '../integrations/resend';
import { renderContactEmail } from '../utils/resend/render-contact-email';

export async function sendContact(req: Request, res: Response) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const parse = contactSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Dados inválidos', details: parse.error.errors });
  }
  const { name = '', phone = '', email = '', subject = '', message = '' } = parse.data;

  const allowed = await canSendContactRequest({ email, ip: String(ip) });
  if (!allowed) {
    return res.status(429).json({ error: 'Limite de mensagens atingido. Tente novamente mais tarde.' });
  }

  await registerContactRequest({ name, email, message, ip: String(ip), phone, subject });

  const html = await renderContactEmail({ name, email, phone, subject, message });

  await sendContactEmail({
    subject: `Novo contato - ${subject}`,
    html
  });

  return res.status(200).json({ success: true });
} 