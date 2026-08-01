import { motion } from 'framer-motion';
import type { Experience } from '@portfolio/contracts';
import { staggerDelay, useEntrance } from '../../components/motion/useEntrance';

interface HistorySectionProps {
  experience: Experience[];
}

const Commit = ({ entry, index }: { entry: Experience; index: number }) => {
  const entrance = useEntrance({ delay: staggerDelay(index, 0.1) });

  return (
    <motion.article className="commit" {...entrance}>
      <code>{entry.code}</code>
      <div>
        <h3>
          {entry.role} · {entry.company}
        </h3>
        <p>{entry.summary}</p>
      </div>
      <time>{entry.period}</time>
    </motion.article>
  );
};

/** Roles presented as a commit log; `time` is hidden at 600px and below. */
export const HistorySection = ({ experience }: HistorySectionProps) => {
  const labelEntrance = useEntrance({ rise: 0 });

  return (
    <section className="section history" id="history">
      <motion.div className="history-label" {...labelEntrance}>
        03 / GIT HISTORY
      </motion.div>
      <div>
        {experience.map((entry, index) => (
          <Commit key={entry.code} entry={entry} index={index} />
        ))}
      </div>
    </section>
  );
};
