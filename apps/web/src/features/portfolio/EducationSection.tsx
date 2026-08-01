import { motion } from 'framer-motion';
import type { Education } from '@portfolio/contracts';
import { staggerDelay, useEntrance } from '../../components/motion/useEntrance';

interface EducationSectionProps {
  education: Education[];
}

const Degree = ({ entry, index }: { entry: Education; index: number }) => {
  const entrance = useEntrance({ delay: staggerDelay(index, 0.1) });

  return (
    <motion.article className="degree" {...entrance}>
      <div>
        <h3>{entry.degree}</h3>
        <p>
          {entry.institution} · {entry.location}
        </p>
      </div>
      <time>
        GRADUATED
        <br />
        {entry.year}
      </time>
    </motion.article>
  );
};

export const EducationSection = ({ education }: EducationSectionProps) => {
  const labelEntrance = useEntrance({ rise: 0 });

  return (
    <section className="education" id="education">
      <motion.div className="education-label" {...labelEntrance}>
        04 / EDUCATION
      </motion.div>
      <div>
        {education.map((entry, index) => (
          <Degree key={`${entry.degree}-${entry.institution}`} entry={entry} index={index} />
        ))}
      </div>
    </section>
  );
};
