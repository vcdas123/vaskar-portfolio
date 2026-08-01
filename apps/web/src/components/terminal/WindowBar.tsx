interface WindowBarProps {
  label: string;
}

/** The three-dot title bar above a terminal panel. */
export const WindowBar = ({ label }: WindowBarProps) => (
  <div className="windowbar">
    <div className="dots" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
    <span>{label}</span>
    <span aria-hidden="true">●</span>
  </div>
);
