import { Fragment } from 'react';
import type { ArchitectureEntry } from '@portfolio/contracts';

interface ArchitectureScriptProps {
  entries: ArchitectureEntry[];
}

/**
 * Two non-breaking spaces indent each line. Ordinary spaces would collapse in
 * HTML — the reference emits `&nbsp;&nbsp;` for the same reason.
 */
const INDENT = '\u00a0\u00a0';

/**
 * Renders the `const architecture = { … }` block. Every value is a quoted string
 * literal: the reference's runtime renderer treats all entries alike, so the
 * `security: RBAC(...)` call form in the static markup is not reproduced.
 */
export const ArchitectureScript = ({ entries }: ArchitectureScriptProps) => (
  <div className="script">
    <span className="key">const</span> architecture = {'{'}
    <br />
    {entries.map((entry, index) => (
      <Fragment key={entry.key}>
        {INDENT}
        {entry.key}: <span className="str">&quot;{entry.value}&quot;</span>
        {index < entries.length - 1 ? ',' : null}
        <br />
      </Fragment>
    ))}
    {'};'}
  </div>
);
