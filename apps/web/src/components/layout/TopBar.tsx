interface TopBarProps {
  logoText: string;
  headerName: string;
  statusText: string;
}

/**
 * Sticky header. The brand is a wordmark — the lime `~/VD❯` prompt is the mark and
 * the name is set as the logotype beside it — and it links home, which is what a
 * logo is expected to do.
 *
 * At 600px and below the reference collapses the status label to `font-size: 0`,
 * keeping the animated dot. The text stays in the DOM so screen readers still
 * announce "SYSTEM ONLINE" at every viewport.
 */
export const TopBar = ({ logoText, headerName, statusText }: TopBarProps) => (
  <header className="top">
    <a className="brand" href="/" aria-label={`${headerName} — home`}>
      <span className="prompt-logo" aria-hidden="true">
        {logoText}
      </span>
      <span className="brand-name">{headerName}</span>
    </a>
    <span className="live" role="status">
      {statusText}
    </span>
  </header>
);
