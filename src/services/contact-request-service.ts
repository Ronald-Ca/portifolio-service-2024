import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const LIMIT_PER_HOUR = 3;

export async function canSendContactRequest({ email, ip }: { email: string; ip: string }) {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const count = await prisma.contactRequest.count({
    where: {
      OR: [
        { email },
        { ip },
      ],
      createdAt: { gte: oneHourAgo },
    },
  });
  return count < LIMIT_PER_HOUR;
}

export async function registerContactRequest({ name, email, message, ip, phone, subject }: { name: string; email: string; message: string; ip: string; phone?: string; subject?: string }) {
  return prisma.contactRequest.create({
    data: { name, email, message, ip, phone, subject },
  });
} 