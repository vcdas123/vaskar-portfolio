/**
 * Loading state: the boot sequence printed straight onto the page background —
 * no card, no panel, no border around it. It is replaced outright by the page, so
 * it leaves no placeholder behind and the final layout never shifts.
 */
export const BootScreen = () => (
  <div className="boot-screen">
    <div className="boot-console" role="status" aria-live="polite">
      <div className="boot-command">$ portfolio boot --mode=performance</div>
      <div>
        <span>[boot]</span> establishing session <b>done</b>
      </div>
      <div>
        <span>[fetch]</span> loading engineering profile <i aria-hidden="true">•••</i>
      </div>
      <div className="boot-track" aria-hidden="true">
        <span />
      </div>
    </div>
  </div>
);
