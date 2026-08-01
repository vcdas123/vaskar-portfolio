import type {
  CaseStudy as CaseStudyRow,
  CaseStudyFlowNode,
  CaseStudyListItem,
  CaseStudyListKind,
} from '@prisma/client';
import type { CaseStudy } from '@portfolio/contracts';

export type CaseStudyWithRelations = CaseStudyRow & {
  project: { slug: string };
  lists: CaseStudyListItem[];
  flow: CaseStudyFlowNode[];
};

const pickList = (items: CaseStudyListItem[], kind: CaseStudyListKind): string[] =>
  items
    .filter((item) => item.kind === kind)
    .sort((a, b) => a.position - b.position)
    .map((item) => item.text);

export const toCaseStudy = (row: CaseStudyWithRelations): CaseStudy => ({
  slug: row.project.slug,
  problem: row.problem,
  constraints: pickList(row.lists, 'CONSTRAINT'),
  decisions: pickList(row.lists, 'DECISION'),
  implementation: pickList(row.lists, 'IMPLEMENTATION'),
  outcome: row.outcome,
  why: row.why,
  flow: row.flow.map((node) => node.label),
});
