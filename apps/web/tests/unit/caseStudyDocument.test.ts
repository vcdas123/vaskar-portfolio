import { describe, expect, it } from 'vitest';
import { buildCaseStudyDocument } from '../../src/features/case-studies/case-study-document';
import { caseStudyFixture, projectFixture } from './fixtures';

describe('buildCaseStudyDocument', () => {
  const lines = buildCaseStudyDocument(projectFixture, caseStudyFixture);

  it('numbers the source lines consecutively from 1', () => {
    expect(lines[0]?.number).toBe(1);
    expect(lines.map((entry) => entry.number)).toEqual(lines.map((_, index) => index + 1));
  });

  it('opens with the project title as an h1', () => {
    expect(lines[0]?.line).toEqual({
      kind: 'h1',
      text: 'Cachiva — repository analysis',
    });
  });

  it('emits the seven analysis headings in order', () => {
    const headings = lines
      .map((entry) => entry.line)
      .filter((line) => line.kind === 'h2')
      .map((line) => (line.kind === 'h2' ? line.text : ''));

    expect(headings).toEqual([
      '01 / PROBLEM',
      '02 / CONSTRAINTS',
      '03 / ARCHITECTURE DECISIONS',
      '04 / IMPLEMENTATION HIGHLIGHTS',
      '05 / ENGINEERING OUTCOME',
      '06 / WHY IT MATTERS',
      '07 / SYSTEM FLOW',
    ]);
  });

  it('renders every list item as a bullet line', () => {
    const bullets = lines
      .map((entry) => entry.line)
      .filter((line) => line.kind === 'bullet')
      .map((line) => (line.kind === 'bullet' ? line.text : ''));

    expect(bullets).toEqual([
      ...caseStudyFixture.constraints,
      ...caseStudyFixture.decisions,
      ...caseStudyFixture.implementation,
    ]);
  });

  it('fences the system flow and keeps its node order', () => {
    const flow = lines.map((entry) => entry.line).find((line) => line.kind === 'flow');
    expect(flow).toEqual({ kind: 'flow', nodes: caseStudyFixture.flow });

    const fences = lines.map((entry) => entry.line).filter((line) => line.kind === 'fence');
    expect(fences).toHaveLength(2);
  });

  it('does not end on a blank line', () => {
    expect(lines.at(-1)?.line.kind).not.toBe('blank');
  });

  it('carries no content the case study did not supply', () => {
    const text = lines
      .map((entry) => entry.line)
      .flatMap((line) => ('text' in line ? [line.text] : []))
      .join(' ');

    expect(text).toContain(caseStudyFixture.problem);
    expect(text).toContain(caseStudyFixture.outcome);
    expect(text).toContain(caseStudyFixture.why);
  });
});
