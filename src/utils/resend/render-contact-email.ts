import { readFile } from 'fs/promises';
import path from 'path';

export async function renderContactEmail({ name, email, phone, subject, message }: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const templatePath = path.join(__dirname, 'send-contact-email.html');
  let html = await readFile(templatePath, 'utf-8');
  html = html
    .replace(/\{\{name\}\}/g, name)
    .replace(/\{\{email\}\}/g, email)
    .replace(/\{\{phone\}\}/g, phone)
    .replace(/\{\{subject\}\}/g, subject)
    .replace(/\{\{message\}\}/g, message);
  return html;
} 