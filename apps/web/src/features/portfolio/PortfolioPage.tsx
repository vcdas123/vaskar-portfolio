import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useGetPortfolioQuery } from '../../services/portfolioApi';
import { toApiError } from '../../services/api';
import { useAppDispatch } from '../../hooks/useAppStore';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useEntrance } from '../../components/motion/useEntrance';
import { ENTRANCE_TRANSITION } from '../../components/motion/motion-tokens';
import { BootScreen } from '../../components/ui/BootScreen';
import { BootErrorScreen } from '../../components/ui/BootErrorScreen';
import { TopBar } from '../../components/layout/TopBar';
import { ProjectsSection } from '../projects/ProjectsSection';
import { CaseStudyDialog } from '../case-studies/CaseStudyDialog';
import { caseStudyOpened } from '../case-studies/caseStudiesSlice';
import { ContactSection } from '../contact/ContactSection';
import { RuntimeSection } from './RuntimeSection';
import { HeroSection } from './HeroSection';
import { BenchmarkStrip } from './BenchmarkStrip';
import { SkillsSection } from './SkillsSection';
import { HistorySection } from './HistorySection';
import { EducationSection } from './EducationSection';

export const PortfolioPage = () => {
  const dispatch = useAppDispatch();
  const { slug: routeSlug } = useParams<{ slug?: string }>();
  const { data, isLoading, isError, error, refetch } = useGetPortfolioQuery();

  useDocumentTitle(data?.site.title);

  // A plain fade for the shell: the hero and each section run their own entrance
  // on top of it, so adding a rise here would double the movement.
  const pageEntrance = useEntrance({ immediate: true, rise: 0 });

  // `/projects/:slug` is a deep link that opens that project's case study.
  useEffect(() => {
    if (!data || !routeSlug) return;
    if (data.projects.some((project) => project.slug === routeSlug)) {
      dispatch(caseStudyOpened(routeSlug));
    }
  }, [data, routeSlug, dispatch]);

  // `mode="wait"` lets the boot panel finish fading before the page arrives, so
  // the two never overlap and the document height does not jump mid-transition.
  if (isLoading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="boot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={ENTRANCE_TRANSITION}
        >
          <BootScreen />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isError || !data) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="boot-error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={ENTRANCE_TRANSITION}
        >
          <BootErrorScreen error={toApiError(error)} onRetry={() => void refetch()} />
        </motion.div>
      </AnimatePresence>
    );
  }

  const { site, profile, metrics, projects, skills, experience, education, contacts } = data;

  return (
    <motion.main className="shell" {...pageEntrance}>
      <TopBar logoText={site.logoText} headerName={site.headerName} statusText={site.statusText} />

      <HeroSection profile={profile} metrics={metrics} />
      <BenchmarkStrip metrics={metrics} />
      <RuntimeSection />
      <ProjectsSection
        projects={projects}
        onOpenCaseStudy={(slug) => dispatch(caseStudyOpened(slug))}
      />
      <SkillsSection skills={skills} />
      <HistorySection experience={experience} />
      <EducationSection education={education} />

      <ContactSection
        contacts={contacts}
        note={site.contactNote}
        name={profile.name}
        footerYear={site.footerYear}
      />

      <CaseStudyDialog projects={projects} />
    </motion.main>
  );
};
