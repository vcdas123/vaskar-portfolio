import { motion } from 'framer-motion';
import type { SkillGroup } from '@portfolio/contracts';
import { staggerDelay, useEntrance } from '../../components/motion/useEntrance';
import { CheckIcon } from '../../components/ui/icons';

interface SkillsSectionProps {
  skills: SkillGroup[];
}

const SkillColumn = ({ group, index }: { group: SkillGroup; index: number }) => {
  // Columns share vertical borders inside the console, so they only fade.
  const entrance = useEntrance({ rise: 0, delay: staggerDelay(index) });

  return (
    <motion.article className="skill-group" {...entrance}>
      <h3>
        0{index + 1} / {group.group.toUpperCase()}
      </h3>
      <ul>
        {group.items.map((item) => (
          <li key={item}>
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  );
};

/** Groups are numbered `01 /` … `04 /` from their seeded order. */
export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const headEntrance = useEntrance();
  const consoleEntrance = useEntrance({ delay: 0.08 });

  return (
    <section className="skills" id="skills">
      <motion.header className="skills-head" {...headEntrance}>
        <small>02 / CAPABILITY MAP</small>
        <h2>Systems I can compose</h2>
      </motion.header>

      <motion.div className="skill-console" {...consoleEntrance}>
        <div className="skill-top">
          <span>$ portfolio inspect --skills --group=architecture</span>
          <span>DEPENDENCIES RESOLVED ✓</span>
        </div>

        <div className="skill-grid">
          {skills.map((group, index) => (
            <SkillColumn key={group.group} group={group} index={index} />
          ))}
        </div>

        <div className="skill-foot">
          STRATEGY: CHOOSE THE SMALLEST SYSTEM THAT CAN SCALE WITH THE PRODUCT.
        </div>
      </motion.div>
    </section>
  );
};
