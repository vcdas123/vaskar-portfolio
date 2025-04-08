'use client';
import { motion } from 'framer-motion';
import { RiCustomerService2Fill } from 'react-icons/ri';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

interface ServicesDataIn {
  id: string;
  title: string;
  desc: string;
}

const SERVICES_DATA: ServicesDataIn[] = [
  {
    id: '01',
    title: 'Frontend Development',
    desc: 'Proficient in developing intuitive, user-focused UI components leveraging React.js, Next.js, and TypeScript, combined with advanced styling techniques using Tailwind CSS, Mantine UI, and Bootstrap for seamless, responsive applications.',
  },
  {
    id: '02',
    title: 'Backend Development',
    desc: 'Focused on crafting robust backend solutions with Node.js, TypeScript, and Express.js, utilizing MySQL and TypeORM to ensure seamless database integration, efficient API development, and high-performing server-side functionality.',
  },
];

const Services = () => {
  return (
    <SectionWrapper
      sectionId="services"
      icon={<RiCustomerService2Fill />}
      title="Services"
      description="Showcasing expertise in both frontend and backend development with modern technologies and scalable, efficient coding practices."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
        {SERVICES_DATA.map(item => (
          <motion.div
            key={item.id}
            className="flex-1 flex flex-col justify-center gap-6 group cursor-pointer mt-10 mb-10"
          >
            <div className="w-full">
              <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                {item.id}
              </div>
            </div>
            <h2 className="text-[42px] font-bold leading-none group-hover:text-accent transition-all duration-500">
              {item.title}
            </h2>
            <p className="text-white/60">{item.desc}</p>
            <div className="border-b border-white/20 w-full"></div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Services;
