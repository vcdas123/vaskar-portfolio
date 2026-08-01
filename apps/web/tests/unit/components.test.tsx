import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectCard } from '../../src/features/projects/ProjectCard';
import { HeroSection } from '../../src/features/portfolio/HeroSection';
import { RuntimeSection } from '../../src/features/portfolio/RuntimeSection';
import { TopBar } from '../../src/components/layout/TopBar';
import { PageFooter } from '../../src/components/layout/PageFooter';
import { renderWithProviders } from './render';
import { portfolioFixture, projectFixture, secondProjectFixture } from './fixtures';

describe('ProjectCard', () => {
  it('uppercases link labels but keeps the technology casing', () => {
    renderWithProviders(
      <ProjectCard project={projectFixture} index={0} onOpenCaseStudy={vi.fn()} />,
    );

    expect(screen.getByRole('link', { name: /LIVE DEMO/ })).toHaveAttribute(
      'href',
      'https://cachiva.vercel.app/',
    );
    expect(screen.getByRole('link', { name: /API DOCS/ })).toBeInTheDocument();
    // The reference's renderer joins tech verbatim, without uppercasing.
    expect(screen.getByText('React · Node · Prisma')).toBeInTheDocument();
    expect(screen.getByText('PACKAGE / KNOWLEDGE SYSTEM')).toBeInTheDocument();
  });

  it('reports the slug when its case-study button is pressed', async () => {
    const onOpenCaseStudy = vi.fn();
    renderWithProviders(
      <ProjectCard project={secondProjectFixture} index={1} onOpenCaseStudy={onOpenCaseStudy} />,
    );

    // The case study is reached from the card now that the workspace is gone.
    await userEvent.click(screen.getByRole('button', { name: /CASE STUDY/ }));
    expect(onOpenCaseStudy).toHaveBeenCalledWith('myhistory');
  });

  it('opens external links safely', () => {
    renderWithProviders(
      <ProjectCard project={projectFixture} index={0} onOpenCaseStudy={vi.fn()} />,
    );
    const link = screen.getByRole('link', { name: /LIVE DEMO/ });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});

describe('HeroSection', () => {
  it('derives the experience figure from careerStart', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-01T12:00:00'));

    renderWithProviders(
      <HeroSection profile={portfolioFixture.profile} metrics={portfolioFixture.metrics} />,
    );

    expect(screen.getByText('3 yrs 4 mos')).toBeInTheDocument();
    expect(screen.getByText('SDE I')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('renders the metric bars from the terminal presentation of each metric', () => {
    renderWithProviders(
      <HeroSection profile={portfolioFixture.profile} metrics={portfolioFixture.metrics} />,
    );

    expect(screen.getByText('API response')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
  });
});

describe('RuntimeSection', () => {
  it('renders the four operating-model stages in order', () => {
    renderWithProviders(<RuntimeSection />);

    const headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual(['UNDERSTAND', 'ARCHITECT', 'SHIP', 'MEASURE']);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'From ambiguity to measurable systems.',
    );
  });

  it('is a labelled landmark', () => {
    const { container } = renderWithProviders(<RuntimeSection />);
    const section = container.querySelector('section.runtime');
    expect(section).toHaveAttribute('aria-labelledby', 'runtime-title');
  });
});

describe('TopBar', () => {
  it('keeps the status text in the DOM for assistive technology', () => {
    renderWithProviders(<TopBar logoText="~/VD❯" headerName="VASKAR" statusText="SYSTEM ONLINE" />);

    // At ≤600px CSS collapses this to font-size 0; the text itself must remain.
    expect(screen.getByRole('status')).toHaveTextContent('SYSTEM ONLINE');
    expect(screen.getByRole('link', { name: /VASKAR/ })).toHaveAttribute('href', '/');
  });
});

describe('PageFooter', () => {
  it('renders the three footer columns', () => {
    renderWithProviders(
      <PageFooter
        name="Vaskar Chandra Das"
        contactUrl="mailto:vcdas123@gmail.com"
        footerYear={2026}
      />,
    );

    expect(screen.getByText('VASKAR CHANDRA DAS')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /CONTACT/ })).toHaveAttribute(
      'href',
      'mailto:vcdas123@gmail.com',
    );
    expect(screen.getByText('© 2026 VASKAR DAS')).toBeInTheDocument();
  });
});
