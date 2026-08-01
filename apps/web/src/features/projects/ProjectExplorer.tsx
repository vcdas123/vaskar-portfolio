import type { Project } from '@portfolio/contracts';
import { FileIcon, FolderOpenIcon } from '../../components/ui/icons';

interface ProjectExplorerProps {
  projects: Project[];
  selectedSlug: string | null;
  location: string;
  onSelect: (slug: string) => void;
}

/**
 * The explorer lists only the three project files, exactly as the reference does.
 * Rows are native buttons so selection is keyboard-operable; `.tree-button`
 * strips the UA button chrome so `.tree li` styling is unchanged.
 */
export const ProjectExplorer = ({
  projects,
  selectedSlug,
  location,
  onSelect,
}: ProjectExplorerProps) => (
  <aside className="sidebar">
    <div className="side-title">EXPLORER / PORTFOLIO</div>

    <ul className="tree">
      {/* The folder row is decorative and permanently highlighted. */}
      <li className="active">
        <FolderOpenIcon />
        PROJECTS
      </li>
      {projects.map((project) => (
        <li
          key={project.slug}
          className={project.slug === selectedSlug ? 'indent active' : 'indent'}
        >
          <button
            type="button"
            className="tree-button"
            aria-current={project.slug === selectedSlug ? 'true' : undefined}
            onClick={() => onSelect(project.slug)}
          >
            <FileIcon />
            {project.file}
          </button>
        </li>
      ))}
    </ul>

    <div className="side-foot">
      BRANCH: main
      <br />
      STATUS: available
      <br />
      LOCATION: {location}
    </div>
  </aside>
);
