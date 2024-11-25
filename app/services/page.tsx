"use client";
import { motion } from "framer-motion";

interface ServicesDataIn {
  id: string;
  title: string;
  desc: string;
}

const SERVICES_DATA: ServicesDataIn[] = [
  {
    id: "01",
    title: "Frontend Development",
    desc: "Proficient in developing intuitive, user-focused UI components leveraging React.js, Next.js, and TypeScript, combined with advanced styling techniques using Tailwind CSS, Mantine UI, and Bootstrap for seamless, responsive applications.",
  },
  {
    id: "02",
    title: "Backend Development",
    desc: "Focused on crafting robust backend solutions with Node.js, TypeScript, and Express.js, utilizing MySQL and TypeORM to ensure seamless database integration, efficient API development, and high-performing server-side functionality.",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              delay: 2,
              duration: 0.4,
              ease: "easeIn",
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {SERVICES_DATA?.map((item: ServicesDataIn) => {
            return (
              <div
                key={item?.id}
                className="flex-1 flex flex-col justify-center gap-6 group cursor-pointer"
              >
                <div className="w-full">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover  transition-all duration-500">
                    {item?.id}
                  </div>
                </div>
                <h2 className="text-[42px] font-bold leading-none group-hover:text-accent transition-all duration-500">
                  {item?.title}
                </h2>
                <p className="text-white/60">{item?.desc}</p>
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
