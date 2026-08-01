interface CaseStudyLoaderProps {
  slug: string;
}

/**
 * The animated compile state. `role="status"` with `aria-live="polite"` means the
 * sequence is announced rather than silently swapping content, and the dot and
 * track animations are disabled under `prefers-reduced-motion`.
 */
export const CaseStudyLoader = ({ slug }: CaseStudyLoaderProps) => (
  <div className="cs-loader" role="status" aria-live="polite">
    <div className="cs-loader-command">$ portfolio run {slug} --case-study</div>
    <div>
      <span>[read]</span> repository source <b>done</b>
    </div>
    <div>
      <span>[scan]</span> resolving architecture <i aria-hidden="true">•••</i>
    </div>
    <div>
      <span>[build]</span> compiling repository analysis
    </div>
    <div className="cs-loader-track" aria-hidden="true">
      <span />
    </div>
  </div>
);
