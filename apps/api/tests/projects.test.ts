import { afterAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { caseStudySchema, projectSchema } from '@portfolio/contracts';
import { prisma } from '../src/lib/prisma';
import { expectData, expectError, testApp } from './helpers';

afterAll(async () => {
  await prisma.$disconnect();
});

describe('GET /api/projects', () => {
  it('lists every project in dataset order', async () => {
    const response = await request(testApp()).get('/api/projects').expect(200);
    const data = projectSchema.array().parse(expectData(response.body));

    expect(data.map((project) => project.slug)).toEqual(['cachiva', 'discovery', 'myhistory']);
  });
});

describe('GET /api/projects/:slug', () => {
  it('returns a single project with its relations', async () => {
    const response = await request(testApp()).get('/api/projects/discovery').expect(200);
    const data = projectSchema.parse(expectData(response.body));

    expect(data.title).toBe('Discovery Hub');
    expect(data.file).toBe('discovery-hub.ts');
    expect(data.tech).toEqual(['Webpack 5', 'Redux', 'MUI']);
    expect(data.cardDescription).toMatch(/Runtime-loaded remotes/);
    expect(data.links.some((link) => link.primary)).toBe(true);
  });

  it('404s for an unknown slug', async () => {
    const response = await request(testApp()).get('/api/projects/nope').expect(404);
    expect(expectError(response.body).code).toBe('NOT_FOUND');
  });

  it('422s for a malformed slug rather than reaching the database', async () => {
    const response = await request(testApp()).get('/api/projects/Not_A_Slug').expect(422);
    const error = expectError(response.body);

    expect(error.code).toBe('VALIDATION_FAILED');
    expect(error.details?.[0]?.path).toBe('slug');
  });
});

describe('GET /api/projects/:slug/case-study', () => {
  it('returns the case study with ordered lists and flow', async () => {
    const response = await request(testApp()).get('/api/projects/myhistory/case-study').expect(200);
    const data = caseStudySchema.parse(expectData(response.body));

    expect(data.slug).toBe('myhistory');
    expect(data.constraints).toHaveLength(3);
    expect(data.decisions).toHaveLength(3);
    expect(data.implementation).toHaveLength(3);
    expect(data.flow).toEqual([
      'Local files',
      'Catalog + resync',
      'PostgreSQL metadata',
      'Documents / timelines / expenses',
      'Linked evidence',
    ]);
  });

  it('keeps the three list kinds separate', async () => {
    const response = await request(testApp()).get('/api/projects/cachiva/case-study').expect(200);
    const data = caseStudySchema.parse(expectData(response.body));

    expect(data.constraints[0]).toMatch(/One content model/);
    expect(data.decisions[0]).toMatch(/markdown parser/);
    expect(data.implementation[0]).toMatch(/CodeMirror/);
  });

  it('404s for a project that has no case study', async () => {
    const response = await request(testApp()).get('/api/projects/unknown/case-study').expect(404);
    expect(expectError(response.body).code).toBe('NOT_FOUND');
  });
});

describe('unmatched routes', () => {
  it('404s with the standard envelope', async () => {
    const response = await request(testApp()).get('/api/does-not-exist').expect(404);
    expect(expectError(response.body).code).toBe('NOT_FOUND');
  });
});
