import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectExplorer } from '../../src/features/projects/ProjectExplorer';
import { ProjectTabs } from '../../src/features/projects/ProjectTabs';
import { ProjectOutput } from '../../src/features/projects/ProjectOutput';
import { ProjectCard } from '../../src/features/projects/ProjectCard';
import { HeroSection } from '../../src/features/portfolio/HeroSection';
import { TopBar } from '../../src/components/layout/TopBar';
import { PageFooter } from '../../src/components/layout/PageFooter';
import { renderWithProviders } from './render';
import { portfolioFixture, projectFixture, secondProjectFixture } from './fixtures';

describe('ProjectExplorer', () => {
  const projects = [projectFixture, secondProjectFixture];

  it('lists the project files as native buttons', () => {
    renderWithProviders(
      <ProjectExplorer
        projects={projects}
        selectedSlug="cachiva"
        location="Kolkata, India"
        onSelect={vi.fn()}
      />,
    );

    // Native buttons are what make the explorer keyboard operable.
    expect(screen.getByRole('button', { name: /cachiva\.ts/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /myhistory\.ts/ })).toBeInTheDocument();
    expect(screen.getByText(/LOCATION:/)).toBeInTheDocument();
  });

  it('marks the selected file with aria-current', () => {
    renderWithProviders(
      <ProjectExplorer
        projects={projects}
        selectedSlug="myhistory"
        location="Kolkata, India"
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /myhistory\.ts/ })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('button', { name: /cachiva\.ts/ })).not.toHaveAttribute('aria-current');
  });

  it('reports selection by slug', async () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <ProjectExplorer
        projects={projects}
        selectedSlug="cachiva"
        location="Kolkata, India"
        onSelect={onSelect}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: /myhistory\.ts/ }));
    expect(onSelect).toHaveBeenCalledWith('myhistory');
  });

  it('is operable with the keyboard alone', async () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <ProjectExplorer
        projects={projects}
        selectedSlug="cachiva"
        location="Kolkata, India"
        onSelect={onSelect}
      />,
    );

    screen.getByRole('button', { name: /myhistory\.ts/ }).focus();
    await userEvent.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith('myhistory');
  });
});

describe('ProjectTabs', () => {
  const projects = [projectFixture, secondProjectFixture];

  it('adds a case-study.md tab only while a case study is open', () => {
    const { rerender } = renderWithProviders(
      <ProjectTabs
        projects={projects}
        selectedSlug="cachiva"
        isCaseStudyOpen={false}
        onSelect={vi.fn()}
        onCloseCaseStudy={vi.fn()}
      />,
    );
    expect(screen.queryByRole('tab', { name: /case-study\.md/ })).not.toBeInTheDocument();

    rerender(
      <ProjectTabs
        projects={projects}
        selectedSlug="cachiva"
        isCaseStudyOpen
        onSelect={vi.fn()}
        onCloseCaseStudy={vi.fn()}
      />,
    );
    expect(screen.getByRole('tab', { name: /case-study\.md/ })).toBeInTheDocument();
    // The case study owns the active state while it is open.
    expect(screen.getByRole('tab', { name: /cachiva\.ts/ })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('closing the case-study tab calls the close handler', async () => {
    const onCloseCaseStudy = vi.fn();
    renderWithProviders(
      <ProjectTabs
        projects={projects}
        selectedSlug="cachiva"
        isCaseStudyOpen
        onSelect={vi.fn()}
        onCloseCaseStudy={onCloseCaseStudy}
      />,
    );

    await userEvent.click(screen.getByRole('tab', { name: /case-study\.md/ }));
    expect(onCloseCaseStudy).toHaveBeenCalledOnce();
  });
});

describe('ProjectOutput', () => {
  it('renders the architecture block with every value as a quoted string', () => {
    renderWithProviders(
      <ProjectOutput
        project={projectFixture}
        compileState="closed"
        isHidden={false}
        onRunCaseStudy={vi.fn()}
      />,
    );

    expect(screen.getByText(/const/)).toBeInTheDocument();
    expect(screen.getByText('"React + TypeScript"')).toBeInTheDocument();
    // The reference's runtime renderer quotes every value, including RBAC(...).
    expect(screen.getByText('"RBAC(public, private)"')).toBeInTheDocument();
  });

  it('labels the run button for each compile state', () => {
    const { rerender } = renderWithProviders(
      <ProjectOutput
        project={projectFixture}
        compileState="closed"
        isHidden={false}
        onRunCaseStudy={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: /RUN CASE STUDY/ })).toBeInTheDocument();

    rerender(
      <ProjectOutput
        project={projectFixture}
        compileState="compiling"
        isHidden
        onRunCaseStudy={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: /COMPILING CASE STUDY/ })).toBeInTheDocument();

    rerender(
      <ProjectOutput
        project={projectFixture}
        compileState="ready"
        isHidden
        onRunCaseStudy={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: /CASE STUDY OPEN/ })).toBeInTheDocument();
  });

  it('renders the build log and primary outcome, uppercased', () => {
    const { container } = renderWithProviders(
      <ProjectOutput
        project={projectFixture}
        compileState="closed"
        isHidden={false}
        onRunCaseStudy={vi.fn()}
      />,
    );

    // Log lines are bare text nodes beside their ✓ marks, so assert on the panel.
    const log = container.querySelector('.log');
    expect(log?.textContent).toContain('relational schema compiled');
    expect(log?.textContent).toContain('JWT guards enabled');
    expect(log?.textContent).toContain('BUILD SUCCESSFUL');

    expect(screen.getByText('2×')).toBeInTheDocument();
    expect(screen.getByText('FOCUSED USER EXPERIENCES')).toBeInTheDocument();
  });
});

describe('ProjectCard', () => {
  it('uppercases link labels but keeps the technology casing', () => {
    renderWithProviders(<ProjectCard project={projectFixture} index={0} />);

    expect(screen.getByRole('link', { name: /LIVE DEMO/ })).toHaveAttribute(
      'href',
      'https://cachiva.vercel.app/',
    );
    expect(screen.getByRole('link', { name: /API DOCS/ })).toBeInTheDocument();
    // The reference's renderer joins tech verbatim, without uppercasing.
    expect(screen.getByText('React · Node · Prisma')).toBeInTheDocument();
    expect(screen.getByText('PACKAGE / KNOWLEDGE SYSTEM')).toBeInTheDocument();
  });

  it('opens external links safely', () => {
    renderWithProviders(<ProjectCard project={projectFixture} index={0} />);
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
