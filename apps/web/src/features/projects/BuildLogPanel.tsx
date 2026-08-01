import { Fragment } from 'react';
import { CheckIcon } from '../../components/ui/icons';

interface BuildLogPanelProps {
  logs: string[];
  metric: string;
  outcome: string;
}

/** The right-hand column of the workspace: build log plus primary outcome. */
export const BuildLogPanel = ({ logs, metric, outcome }: BuildLogPanelProps) => (
  <aside className="output-side">
    <div>
      <h3>OUTPUT / BUILD LOG</h3>
      <div className="log">
        {logs.map((log) => (
          <Fragment key={log}>
            <span className="ok">
              <CheckIcon />
            </span>{' '}
            {log}
            <br />
          </Fragment>
        ))}
        <br />
        <span className="ok">BUILD SUCCESSFUL</span>
      </div>
    </div>

    <div className="resultbox">
      <small>PRIMARY OUTCOME</small>
      <b>{metric}</b>
      <span>{outcome.toUpperCase()}</span>
    </div>
  </aside>
);
