import type { ApiError } from '@portfolio/contracts';
import { RestartIcon } from './icons';

interface BootErrorScreenProps {
  error: ApiError;
  onRetry: () => void;
}

/**
 * Recoverable error state. Printed in the same card-less boot console as the
 * loading state, with an explicit retry rather than a forced reload.
 */
export const BootErrorScreen = ({ error, onRetry }: BootErrorScreenProps) => (
  <div className="boot-screen">
    <div className="boot-console" role="alert">
      <div className="boot-command">$ portfolio boot --mode=performance</div>
      <div>
        <span className="boot-fail">[error]</span> {error.message}
      </div>
      <div>
        <span className="boot-fail">[code]</span> {error.code}
      </div>
      <button type="button" className="boot-retry" onClick={onRetry}>
        <RestartIcon />
        RETRY CONNECTION
      </button>
    </div>
  </div>
);
