import type { CaseStudy, Project } from '@portfolio/contracts';

/**
 * Turns a case study into the lines of a Markdown document.
 *
 * The file is presented as what the workspace tab already calls it —
 * `case-study.md` — so the model here is a list of source lines with a kind,
 * which the renderer draws in an editor gutter view.
 */
export type DocLine =
  | { kind: 'blank' }
  | { kind: 'h1'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'bullet'; text: string }
  | { kind: 'fence'; label: string }
  | { kind: 'flow'; nodes: string[] };

export interface NumberedDocLine {
  /** 1-based source line number shown in the gutter. */
  number: number;
  line: DocLine;
}

const section = (heading: string, body: DocLine[]): DocLine[] => [
  { kind: 'h2', text: heading },
  { kind: 'blank' },
  ...body,
  { kind: 'blank' },
];

const bullets = (items: string[]): DocLine[] =>
  items.map((text) => ({ kind: 'bullet' as const, text }));

export const buildCaseStudyDocument = (project: Project, study: CaseStudy): NumberedDocLine[] => {
  const lines: DocLine[] = [
    { kind: 'h1', text: `${project.title} — repository analysis` },
    { kind: 'blank' },
    ...section('01 / PROBLEM', [{ kind: 'paragraph', text: study.problem }]),
    ...section('02 / CONSTRAINTS', bullets(study.constraints)),
    ...section('03 / ARCHITECTURE DECISIONS', bullets(study.decisions)),
    ...section('04 / IMPLEMENTATION HIGHLIGHTS', bullets(study.implementation)),
    ...section('05 / ENGINEERING OUTCOME', [{ kind: 'paragraph', text: study.outcome }]),
    ...section('06 / WHY IT MATTERS', [{ kind: 'paragraph', text: study.why }]),
    ...section('07 / SYSTEM FLOW', [
      { kind: 'fence', label: 'flow' },
      { kind: 'flow', nodes: study.flow },
      { kind: 'fence', label: '' },
    ]),
  ];

  // Drop the trailing blank so the document does not end on an empty gutter row.
  while (lines.at(-1)?.kind === 'blank') {
    lines.pop();
  }

  return lines.map((line, index) => ({ number: index + 1, line }));
};
