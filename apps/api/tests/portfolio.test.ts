import { afterAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { portfolioPayloadSchema, healthResponseSchema } from '@portfolio/contracts';
import { prisma } from '../src/lib/prisma';
import { expectData, testApp } from './helpers';

afterAll(async () => {
  await prisma.$disconnect();
});

describe('GET /api/health', () => {
  it('reports the service and database as up', async () => {
    const response = await request(testApp()).get('/api/health').expect(200);
    const data = healthResponseSchema.parse(expectData(response.body));

    expect(data.status).toBe('ok');
    expect(data.database).toBe('up');
  });
});

describe('GET /api/portfolio', () => {
  it('returns a payload satisfying the shared contract', async () => {
    const response = await request(testApp()).get('/api/portfolio').expect(200);
    // Parsing with the same schema the client uses proves the contract holds.
    const data = portfolioPayloadSchema.parse(expectData(response.body));

    expect(data.projects).toHaveLength(3);
    expect(data.metrics).toHaveLength(4);
    expect(data.skills).toHaveLength(4);
    expect(data.experience).toHaveLength(2);
    expect(data.education).toHaveLength(1);
    expect(data.contacts).toHaveLength(4);
  });

  it('preserves the dataset ordering through explicit position fields', async () => {
    const response = await request(testApp()).get('/api/portfolio').expect(200);
    const data = portfolioPayloadSchema.parse(expectData(response.body));

    expect(data.projects.map((project) => project.slug)).toEqual([
      'cachiva',
      'discovery',
      'myhistory',
    ]);
    expect(data.metrics.map((metric) => metric.key)).toEqual(['api', 'query', 'load', 'render']);
    expect(data.skills.map((group) => group.group)).toEqual([
      'Interface',
      'Services & Data',
      'Architecture',
      'Quality & Delivery',
    ]);
    expect(data.contacts.map((contact) => contact.type)).toEqual([
      'Email',
      'Phone',
      'LinkedIn',
      'GitHub',
    ]);
  });

  it('no longer carries the workspace-era project fields', async () => {
    const response = await request(testApp()).get('/api/portfolio').expect(200);
    const data = portfolioPayloadSchema.parse(expectData(response.body));
    const raw = JSON.parse(JSON.stringify(data.projects[0])) as Record<string, unknown>;

    // The runtime section replaced the IDE workspace, so these are gone from the
    // schema, the database and the payload.
    for (const field of ['description', 'architecture', 'logs', 'metric', 'outcome']) {
      expect(raw).not.toHaveProperty(field);
    }
    expect(Object.keys(raw).sort()).toEqual(
      ['cardDescription', 'command', 'file', 'links', 'slug', 'tech', 'title', 'type'].sort(),
    );
  });

  it('exposes careerStart so the client can derive experience', async () => {
    const response = await request(testApp()).get('/api/portfolio').expect(200);
    const data = portfolioPayloadSchema.parse(expectData(response.body));

    expect(data.profile.careerStart).toBe('2023-04-01');
    // A precomputed experience string must never appear in the payload.
    expect(JSON.stringify(data.profile)).not.toMatch(/yrs?\b/);
  });

  it('carries both the benchmark and terminal presentations of each metric', async () => {
    const response = await request(testApp()).get('/api/portfolio').expect(200);
    const data = portfolioPayloadSchema.parse(expectData(response.body));

    expect(data.metrics[0]).toMatchObject({
      key: 'api',
      label: 'API response time',
      terminalLabel: 'API response',
      value: '-45%',
      terminalValue: '45%',
      progress: 90,
    });
  });

  it('serves theme tokens from site settings', async () => {
    const response = await request(testApp()).get('/api/portfolio').expect(200);
    const data = portfolioPayloadSchema.parse(expectData(response.body));

    expect(data.site.theme.colors.primary).toBe('#b7ff55');
    expect(data.site.theme.fonts.mono).toBe('DM Mono');
    expect(data.site.title).toBe('Vaskar — Performance Terminal');
  });
});
