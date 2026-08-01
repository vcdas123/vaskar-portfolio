import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { contactResponseSchema } from '@portfolio/contracts';
import { prisma } from '../src/lib/prisma';
import { expectData, expectError, testApp } from './helpers';

const validPayload = {
  name: 'Integration Tester',
  purpose: 'Hiring',
  message: 'Checking the contact endpoint end to end.',
};

beforeEach(async () => {
  await prisma.contactSubmission.deleteMany();
});

afterAll(async () => {
  await prisma.contactSubmission.deleteMany();
  await prisma.$disconnect();
});

describe('POST /api/contact', () => {
  it('persists a submission with timestamps and status', async () => {
    const response = await request(testApp()).post('/api/contact').send(validPayload).expect(201);
    const data = contactResponseSchema.parse(expectData(response.body));

    expect(data.status).toBe('received');
    expect(new Date(data.receivedAt).getTime()).toBeLessThanOrEqual(Date.now() + 1000);

    // Database persistence *is* the completed behaviour until email is configured.
    const stored = await prisma.contactSubmission.findUniqueOrThrow({ where: { id: data.id } });
    expect(stored).toMatchObject({ ...validPayload, status: 'RECEIVED' });
    expect(stored.receivedAt).toBeInstanceOf(Date);
    expect(stored.updatedAt).toBeInstanceOf(Date);
  });

  it('trims surrounding whitespace before persisting', async () => {
    const response = await request(testApp())
      .post('/api/contact')
      .send({ name: '  Padded  ', purpose: ' Hiring ', message: '  Hello  ' })
      .expect(201);

    const { id } = contactResponseSchema.parse(expectData(response.body));
    const stored = await prisma.contactSubmission.findUniqueOrThrow({ where: { id } });
    expect(stored.name).toBe('Padded');
    expect(stored.message).toBe('Hello');
  });

  it.each([
    ['name', { purpose: 'Hiring', message: 'Body' }],
    ['purpose', { name: 'Tester', message: 'Body' }],
    ['message', { name: 'Tester', purpose: 'Hiring' }],
  ])('422s when %s is missing', async (field, payload) => {
    const response = await request(testApp()).post('/api/contact').send(payload).expect(422);
    const error = expectError(response.body);

    expect(error.code).toBe('VALIDATION_FAILED');
    expect(error.details?.some((detail) => detail.path === field)).toBe(true);
    expect(await prisma.contactSubmission.count()).toBe(0);
  });

  it('422s when a field is only whitespace', async () => {
    const response = await request(testApp())
      .post('/api/contact')
      .send({ ...validPayload, name: '   ' })
      .expect(422);

    expect(expectError(response.body).details?.[0]?.path).toBe('name');
    expect(await prisma.contactSubmission.count()).toBe(0);
  });

  it('422s when a field exceeds its maximum length', async () => {
    const response = await request(testApp())
      .post('/api/contact')
      .send({ ...validPayload, message: 'x'.repeat(4001) })
      .expect(422);

    expect(expectError(response.body).details?.[0]?.path).toBe('message');
  });

  it('rejects malformed JSON with a typed error', async () => {
    const response = await request(testApp())
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send('{"name":')
      .expect(400);

    expect(expectError(response.body).code).toBe('MALFORMED_JSON');
  });

  it('rejects a body over the configured size limit', async () => {
    const response = await request(testApp())
      .post('/api/contact')
      .send({ ...validPayload, message: 'x'.repeat(40_000) })
      .expect(413);

    expect(expectError(response.body).code).toBe('PAYLOAD_TOO_LARGE');
    expect(await prisma.contactSubmission.count()).toBe(0);
  });

  it('ignores unexpected fields instead of persisting them', async () => {
    const response = await request(testApp())
      .post('/api/contact')
      .send({ ...validPayload, status: 'ARCHIVED', id: 'injected' })
      .expect(201);

    const { id } = contactResponseSchema.parse(expectData(response.body));
    expect(id).not.toBe('injected');
    const stored = await prisma.contactSubmission.findUniqueOrThrow({ where: { id } });
    expect(stored.status).toBe('RECEIVED');
  });

  it('stores SQL-looking input verbatim, since all queries are parameterised', async () => {
    const injection = "Robert'); DROP TABLE contact_submissions;--";
    const response = await request(testApp())
      .post('/api/contact')
      .send({ ...validPayload, name: injection })
      .expect(201);

    const { id } = contactResponseSchema.parse(expectData(response.body));
    const stored = await prisma.contactSubmission.findUniqueOrThrow({ where: { id } });
    expect(stored.name).toBe(injection);
    // The table is still there.
    expect(await prisma.contactSubmission.count()).toBe(1);
  });
});

describe('error responses', () => {
  it('never leaks stack traces or internal details', async () => {
    const response = await request(testApp()).post('/api/contact').send({}).expect(422);
    const serialized = JSON.stringify(response.body);

    expect(serialized).not.toMatch(/\bat .*\.ts:/);
    expect(serialized).not.toMatch(/node_modules/);
    expect(serialized).not.toMatch(/prisma/i);
    expect(serialized).not.toMatch(/postgres/i);
  });
});

describe('CORS policy', () => {
  it('accepts a same-origin POST, which is what a browser form actually sends', async () => {
    // Browsers attach `Origin` to POST even when the request is same-origin. The
    // deployment serves the site and the API from one host, so rejecting an origin
    // that matches the request host would break every real submission — and a
    // configured allowlist cannot help, because each Vercel preview deployment has
    // a different hostname.
    const response = await request(testApp())
      .post('/api/contact')
      .set('Host', 'portfolio.example.com')
      .set('Origin', 'https://portfolio.example.com')
      .send(validPayload)
      .expect(201);

    expect(contactResponseSchema.parse(expectData(response.body)).status).toBe('received');
  });

  it('honours the public hostname when running behind a proxy', async () => {
    const response = await request(testApp())
      .post('/api/contact')
      .set('X-Forwarded-Host', 'portfolio.example.com')
      .set('Origin', 'https://portfolio.example.com')
      .send(validPayload)
      .expect(201);

    expect(response.body).toHaveProperty('ok', true);
  });

  it('rejects a foreign origin with a typed 403', async () => {
    const response = await request(testApp())
      .post('/api/contact')
      .set('Host', 'portfolio.example.com')
      .set('Origin', 'https://attacker.example')
      .send(validPayload)
      .expect(403);

    expect(expectError(response.body).code).toBe('FORBIDDEN_ORIGIN');
    expect(await prisma.contactSubmission.count()).toBe(0);
  });

  it('still accepts requests with no Origin at all (curl, server-to-server)', async () => {
    await request(testApp()).post('/api/contact').send(validPayload).expect(201);
  });
});
