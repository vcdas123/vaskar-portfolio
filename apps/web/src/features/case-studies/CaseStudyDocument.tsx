import type { CaseStudy, Project } from '@portfolio/contracts';
import { BackIcon, ExternalIcon } from '../../components/ui/icons';
import { CaseStudyMarkdown } from './CaseStudyMarkdown';

interface CaseStudyDocumentProps {
  project: Project;
  study: CaseStudy;
  onClose: () => void;
}

/**
 * The compiled case study: terminal chrome around the `case-study.md` source view.
 * The analysis content itself is rendered by `CaseStudyMarkdown`.
 */
export const CaseStudyDocument = ({ project, study, onClose }: CaseStudyDocumentProps) => (
  <>
    <header className="cs-head">
      <span className="cs-kicker">CASE STUDY / REPOSITORY ANALYSIS</span>
      <h2>{project.title}</h2>
      <button type="button" className="cs-close" onClick={onClose}>
        <BackIcon />
        BACK TO {project.file.toUpperCase()}
      </button>
    </header>

    <div className="cs-terminal">
      <div className="cs-status">
        <span>$ portfolio run {project.slug} --case-study</span>
        <span>COMPILED FROM SOURCE ✓</span>
      </div>

      <CaseStudyMarkdown project={project} study={study} />

      <div className="cs-actions">
        {project.links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer noopener">
            {link.label.toUpperCase()}
            <ExternalIcon />
          </a>
        ))}
      </div>
    </div>
  </>
);
