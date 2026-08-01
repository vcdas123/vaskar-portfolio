import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { staggerDelay, useEntrance } from '../../components/motion/useEntrance';

/**
 * The engineering operating model — four ordered stages with arrows between them.
 *
 * This replaces the reference's IDE-style workspace (explorer, tab strip, output
 * pane). The content is editorial rather than data-driven: it describes how the
 * work is done, not which projects exist, so it is declared here instead of being
 * seeded. Project data lives in `Selected programs` and the case-study dialog.
 */
const STAGES = [
  {
    index: '01',
    title: 'UNDERSTAND',
    body: 'Map the user problem, constraints and success signals before choosing technology.',
  },
  {
    index: '02',
    title: 'ARCHITECT',
    body: 'Define clear boundaries, data paths and failure modes around the smallest scalable system.',
  },
  {
    index: '03',
    title: 'SHIP',
    body: 'Deliver accessible interfaces and dependable services in observable, testable increments.',
  },
  {
    index: '04',
    title: 'MEASURE',
    body: 'Profile real bottlenecks, verify outcomes and feed evidence into the next iteration.',
  },
] as const;

export const RuntimeSection = () => {
  const headEntrance = useEntrance();
  const consoleEntrance = useEntrance({ delay: 0.08 });

  return (
    <section className="runtime" aria-labelledby="runtime-title">
      <motion.header className="runtime-head" {...headEntrance}>
        <small>ENGINEERING RUNTIME / OPERATING MODEL</small>
        <h2 id="runtime-title">From ambiguity to measurable systems.</h2>
      </motion.header>

      <motion.div className="runtime-console" {...consoleEntrance}>
        <div className="runtime-command">
          <span>$ portfolio execute --strategy=outcomes</span>
          <span>PIPELINE READY ✓</span>
        </div>

        <div className="runtime-flow">
          {STAGES.map((stage, index) => (
            <Fragment key={stage.index}>
              {/* The arrows are siblings of the articles, not children: the grid
                  alternates `1fr auto` so they sit between the stages. */}
              {index > 0 && <i aria-hidden="true">→</i>}
              <RuntimeStage stage={stage} index={index} />
            </Fragment>
          ))}
        </div>

        <div className="runtime-log">
          <span>[input]</span> product ambiguity <b>→</b> <span>[output]</span> resilient experience
          + measurable performance
        </div>
      </motion.div>
    </section>
  );
};

const RuntimeStage = ({ stage, index }: { stage: (typeof STAGES)[number]; index: number }) => {
  // Stages share grid borders, so they fade in place rather than rising.
  const entrance = useEntrance({ rise: 0, delay: staggerDelay(index) });

  return (
    <motion.article {...entrance}>
      <b>{stage.index}</b>
      <h3>{stage.title}</h3>
      <p>{stage.body}</p>
    </motion.article>
  );
};
