import { FaBootstrap, FaCss3, FaHtml5, FaJs, FaNodeJs } from 'react-icons/fa';
import { SiExpress, SiMantine, SiTypescript } from 'react-icons/si';
import { RiNextjsFill, RiReactjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { DiMongodb, DiMysql } from 'react-icons/di';

// ABOUT_DATA
export interface AboutInfo {
  label: string;
  value: string;
}

export interface AboutData {
  title: string;
  desc: string;
  info: AboutInfo[];
}

// EXPERIENCE_DATA
export interface CompanyExperience {
  name: string;
  position: string;
  duration: string;
}

export interface ExperienceData {
  icon: string;
  title: string;
  desc: string;
  companies: CompanyExperience[];
}

// EDUCATION_DATA
export interface EducationInstitute {
  institute: string;
  degree: string;
  duration: string;
}

export interface EducationData {
  icon: string;
  title: string;
  desc: string;
  institutes: EducationInstitute[];
}

// SKILLS_DATA
export interface Skill {
  label: string;
  icon: JSX.Element;
}

export interface SkillsData {
  title: string;
  desc: string;
  skills: Skill[];
}

function calculateDuration(): string {
  const startDate: Date = new Date('2023-04-17');
  const currentDate: Date = new Date();

  let years: number = currentDate.getFullYear() - startDate.getFullYear();
  let months: number = currentDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const pluralize = (count: number, label: string): string => `${count} ${label}${count !== 1 ? 's' : ''}`;

  const yearsText: string = pluralize(years, 'year');
  const monthsText: string = pluralize(months, 'month');

  return `${yearsText} ${monthsText}`;
}

export const ABOUT_DATA: AboutData = {
  title: 'About Me',
  desc: 'As a Software Development Engineer (SDE), I specialize in building robust applications using technologies such as HTML, CSS, JavaScript, TypeScript, React.js, Next.js, Node.js, MongoDB, and MySQL.',
  info: [
    {
      label: 'Name',
      value: 'Vaskar Chandra Das',
    },
    {
      label: 'Mobile',
      value: '(+91) 8910517164',
    },
    {
      label: 'Email',
      value: 'vcdas123@gmail.com',
    },
    {
      label: 'Experience',
      value: calculateDuration(),
    },
    {
      label: 'Nationality',
      value: 'Indian',
    },
    {
      label: 'Languages',
      value: 'English, Hindi, Bengali',
    },
    {
      label: 'Freelance',
      value: 'Available',
    },
    {
      label: 'Date of birth',
      value: '19 July 1997',
    },
  ],
};

export const EXPERIENCE_DATA: ExperienceData = {
  icon: '/public/resume/badge.svg',
  title: 'Experience',
  desc: 'Experienced SDE proficient in MERN stack, building scalable web applications with React.js, Node.js, TypeScript, MongoDB, and MySQL.',
  companies: [
    {
      name: 'iRM Cloud',
      position: 'SDE II',
      duration: 'Sep 2023 - Present',
    },
    {
      name: 'Webhibe Technologies Pvt. Ltd.',
      position: 'React.js Developer',
      duration: 'Apr 2023 - Aug 2023',
    },
  ],
};

export const EDUCATION_DATA: EducationData = {
  icon: '/public/resume/cap.svg',
  title: 'Education',
  desc: "I completed my 10th and 12th from CBSE and earned a Master's in Computer Applications, building a strong foundation in computer science and application development.",
  institutes: [
    {
      institute: 'Swami Vivekananda University | Barrackpore ',
      degree: 'Master of Computer Applications',
      duration: '2022 - 2024',
    },
    {
      institute: 'University of Kalyani | Kalyani',
      degree: 'Bachelor of Science in Chemistry',
      duration: '2016 - 2019',
    },
    {
      institute: 'Kendriya Vidyalaya No.2 | Kanchrapara',
      degree: 'Higher Secondary | 12th',
      duration: '2015 - 2016',
    },
    {
      institute: 'Kendriya Vidyalaya No.2 | Kanchrapara',
      degree: 'Matriculation | 10th',
      duration: '2014 - 2015',
    },
  ],
};

export const SKILLS_DATA: SkillsData = {
  title: 'Skills',
  desc: 'Focused on creating scalable web solutions with MERN stack technologies like React.js, Node.js, TypeScript, MongoDB, and MySQL',
  skills: [
    {
      label: 'HTML5',
      icon: <FaHtml5 />,
    },
    {
      label: 'CSS3',
      icon: <FaCss3 />,
    },
    {
      label: 'Tailwind Css',
      icon: <RiTailwindCssFill />,
    },
    {
      label: 'Bootstrap',
      icon: <FaBootstrap />,
    },
    {
      label: 'Mantine UI',
      icon: <SiMantine />,
    },
    {
      label: 'Javascript',
      icon: <FaJs />,
    },
    {
      label: 'Typescript',
      icon: <SiTypescript />,
    },
    {
      label: 'React.js',
      icon: <RiReactjsFill />,
    },
    {
      label: 'Next.js',
      icon: <RiNextjsFill />,
    },
    {
      label: 'Node.js',
      icon: <FaNodeJs />,
    },
    {
      label: 'Express.js',
      icon: <SiExpress />,
    },
    {
      label: 'MongoDB',
      icon: <DiMongodb />,
    },
    {
      label: 'MySQL',
      icon: <DiMysql />,
    },
  ],
};

export const RESUME_DATA = [EXPERIENCE_DATA, EDUCATION_DATA, SKILLS_DATA, ABOUT_DATA];
