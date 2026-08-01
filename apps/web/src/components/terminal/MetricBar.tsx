interface MetricBarProps {
  label: string;
  /** Fill width as a percentage of the track. */
  progress: number;
  value: string;
}

/**
 * One `label ▮▮▮▮▯▯ 45%` row inside the boot terminal. The track and fill are
 * `<i>` elements, matching the reference markup the stylesheet targets.
 */
export const MetricBar = ({ label, progress, value }: MetricBarProps) => (
  <div className="bar">
    <span>{label}</span>
    <i className="track">
      <i className="fill" style={{ width: `${progress}%` }} />
    </i>
    <b>{value}</b>
  </div>
);
