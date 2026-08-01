import { motion } from 'framer-motion';
import type { Metric, Profile } from '@portfolio/contracts';
import { WindowBar } from '../../components/terminal/WindowBar';
import { MetricBar } from '../../components/terminal/MetricBar';
import { useEntrance } from '../../components/motion/useEntrance';
import { formatExperienceSince } from '../../lib/experience';

interface HeroSectionProps {
  profile: Profile;
  metrics: Metric[];
}

/** Dot leaders are reproduced at the reference's exact widths. */
const EXPERIENCE_LEADER = '.'.repeat(24);
const ROLE_LEADER = '.'.repeat(22);

export const HeroSection = ({ profile, metrics }: HeroSectionProps) => {
  // Derived on every render from `careerStart` — never a stored figure.
  const experience = formatExperienceSince(profile.careerStart);

  // Above the fold: play on mount rather than waiting for a scroll.
  const copyEntrance = useEntrance({ immediate: true });
  const panelEntrance = useEntrance({ immediate: true, delay: 0.12 });

  return (
    <section className="hero">
      <motion.div className="hero-copy" {...copyEntrance}>
        <div className="path">
          <span>vaskar@portfolio</span>:~/engineering$ whoami
        </div>
        <h1>
          I ship fast.
          <br />
          <em>Then faster.</em>
        </h1>
        <p>{profile.positioning}</p>
        <div className="cmd">
          run portfolio --mode=performance
          <span className="blink" aria-hidden="true" />
        </div>
      </motion.div>

      <motion.aside className="statusbox" {...panelEntrance}>
        <WindowBar label="benchmark.log" />
        <div className="terminal-body">
          <span className="dim">[boot]</span> loading engineering profile...{' '}
          <span className="green">done</span>
          <br />
          <span className="dim">[scan]</span> experience {EXPERIENCE_LEADER}{' '}
          <span className="green">{experience}</span>
          <br />
          <span className="dim">[scan]</span> current role {ROLE_LEADER}{' '}
          <span className="cyan">{profile.role}</span>
          <br />
          <span className="dim">[test]</span> performance improvements
          {metrics.map((metric) => (
            <MetricBar
              key={metric.key}
              label={metric.terminalLabel}
              progress={metric.progress}
              value={metric.terminalValue}
            />
          ))}
          <br />
          <span className="green">✓ all systems operational</span>
        </div>
      </motion.aside>
    </section>
  );
};
