import { Fragment } from 'react';
import type { CaseStudy, Project } from '@portfolio/contracts';
import { FlowArrowIcon } from '../../components/ui/icons';
import { buildCaseStudyDocument, type DocLine } from './case-study-document';

interface CaseStudyMarkdownProps {
  project: Project;
  study: CaseStudy;
}

/** Renders the content column of one source line. */
const LineContent = ({ line }: { line: DocLine }) => {
  switch (line.kind) {
    case 'blank':
      // A zero-width space keeps the row's line-height without any glyph.
      return <span className="md-blank">{'​'}</span>;

    case 'h1':
      return (
        <span className="md-h1">
          <span className="md-mark">#</span> {line.text}
        </span>
      );

    case 'h2':
      return (
        <span className="md-h2">
          <span className="md-mark">##</span> {line.text}
        </span>
      );

    case 'paragraph':
      return <span className="md-text">{line.text}</span>;

    case 'bullet':
      return (
        <span className="md-bullet">
          <span className="md-mark md-dash">-</span>
          <span className="md-text">{line.text}</span>
        </span>
      );

    case 'fence':
      return <span className="md-fence">```{line.label}</span>;

    case 'flow':
      return (
        <span className="flow-line">
          {line.nodes.map((node, index) => (
            <Fragment key={node}>
              {index > 0 && (
                <span className="flow-arrow" aria-hidden="true">
                  <FlowArrowIcon />
                </span>
              )}
              <span className="flow-node">{node}</span>
            </Fragment>
          ))}
        </span>
      );

    default: {
      // Exhaustiveness guard: a new DocLine kind will fail to compile here.
      const exhaustive: never = line;
      return exhaustive;
    }
  }
};

/**
 * The compiled case study as an open Markdown file: a line-number gutter beside
 * mono source lines.
 *
 * This replaces the reference's two-column grid of bordered blocks. That layout
 * read as a spreadsheet — stretched grid rows left large empty gaps under the
 * shorter cells, and the body copy was set in the sans body face, which sat
 * oddly against the surrounding terminal chrome. A single-column source view has
 * no dead space, is mono throughout, and matches what the workspace tab calls the
 * file.
 */
export const CaseStudyMarkdown = ({ project, study }: CaseStudyMarkdownProps) => {
  const lines = buildCaseStudyDocument(project, study);

  return (
    <div className="md-doc">
      {lines.map(({ number, line }) => (
        <div className={`md-line md-line-${line.kind}`} key={number}>
          <span className="md-gutter" aria-hidden="true">
            {number}
          </span>
          <LineContent line={line} />
        </div>
      ))}
    </div>
  );
};
