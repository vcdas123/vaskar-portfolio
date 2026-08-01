import { motion } from 'framer-motion';
import type { Metric } from '@portfolio/contracts';
import { staggerDelay, useEntrance } from '../../components/motion/useEntrance';

interface BenchmarkStripProps {
  metrics: Metric[];
}

const StatCell = ({ metric, index }: { metric: Metric; index: number }) => {
  // A short rise only: the cells share grid borders, so a large offset would
  // visibly detach a cell from its neighbours mid-flight.
  const entrance = useEntrance({ rise: 8, delay: staggerDelay(index) });

  return (
    <motion.div className="stat" {...entrance}>
      <b>{metric.value}</b>
      <span>{metric.label.toUpperCase()}</span>
    </motion.div>
  );
};

/** The four-cell headline strip below the hero. */
export const BenchmarkStrip = ({ metrics }: BenchmarkStripProps) => (
  <section className="summary" id="bench" aria-label="Performance benchmarks">
    {metrics.map((metric, index) => (
      <StatCell key={metric.key} metric={metric} index={index} />
    ))}
  </section>
);
