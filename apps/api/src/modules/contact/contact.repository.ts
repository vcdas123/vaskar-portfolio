import type { ContactRequest } from '@portfolio/contracts';
import type { Prisma } from '../../lib/prisma';
import { prisma } from '../../lib/prisma';

export class ContactRepository {
  constructor(private readonly db: Prisma = prisma) {}

  create(input: ContactRequest) {
    return this.db.contactSubmission.create({
      data: { name: input.name, purpose: input.purpose, message: input.message },
      select: { id: true, status: true, receivedAt: true },
    });
  }
}

export const contactRepository = new ContactRepository();
