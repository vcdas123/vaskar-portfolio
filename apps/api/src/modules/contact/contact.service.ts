import type { ContactRequest, ContactResponse } from '@portfolio/contracts';
import { logger } from '../../lib/logger';
import type { ContactRepository } from './contact.repository';
import { contactRepository } from './contact.repository';
import { toContactResponse } from './contact.mapper';

export class ContactService {
  constructor(private readonly repository: ContactRepository = contactRepository) {}

  /**
   * Persisting the submission is the completed behaviour: until an email
   * transport is configured, the database row *is* the delivery guarantee.
   */
  async submit(input: ContactRequest): Promise<ContactResponse> {
    const row = await this.repository.create(input);
    logger.info({ submissionId: row.id, purpose: input.purpose }, 'contact submission stored');
    return toContactResponse(row);
  }
}

export const contactService = new ContactService();
