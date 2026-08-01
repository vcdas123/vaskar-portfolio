import type { ContactSubmissionStatus } from '@prisma/client';
import type { ContactResponse, ContactStatus } from '@portfolio/contracts';

const STATUS_MAP: Record<ContactSubmissionStatus, ContactStatus> = {
  RECEIVED: 'received',
  REVIEWED: 'reviewed',
  ARCHIVED: 'archived',
};

export const toContactResponse = (row: {
  id: string;
  status: ContactSubmissionStatus;
  receivedAt: Date;
}): ContactResponse => ({
  id: row.id,
  status: STATUS_MAP[row.status],
  receivedAt: row.receivedAt.toISOString(),
});
