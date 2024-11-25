"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperIn } from "swiper/types";

export interface ProjectIn {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: { name: string }[];
  image: string;
  links: {
    live: string;
    github: string;
  };
}

const PROJECTS_DATA: ProjectIn[] = [
  {
    id: "01",
    title: "MoviePedia",
    category: "Frontend Project",
    description:
      "Explore MoviePedia, your go-to app for comprehensive, up-to-date movie information! From favorites to new releases, we’ve got everything for casual viewers and film enthusiasts alike.",
    stack: [{ name: "Saas" }, { name: "React.js" }],
    image: "/projects/moviePedia.png",
    links: {
      live: "https://moviepedia-51f22.web.app/",
      github: "https://github.com/vcdas123/MoviePedia",
    },
  },
  {
    id: "02",
    title: "Foodify",
    category: "Frontend Project",
    description:
      "ReactJS-powered food ordering app with Firebase integration. Features real-time menu updates and simulated ordering system. Demonstrates modern web development skills.",
    stack: [{ name: "React.js" }],
    image: "/projects/reactMeals.png",
    links: {
      live: "https://foodify-55a28.web.app/",
      github: "https://github.com/vcdas123/Food-App",
    },
  },
  {
    id: "03",
    title: "Expense Tracker",
    category: "Frontend Project",
    description:
      "It is a dynamic React app featuring full CRUD functionality, along with year-wise filtering to efficiently manage and track monthly expenses.",
    stack: [{ name: "React.js" }],
    image: "/projects/expense.png",
    links: {
      live: "https://expense-tracker-67b69.web.app/",
      github: "https://github.com/vcdas123/expense-tracker",
    },
  },
  {
    id: "04",
    title: "Travel Application",
    category: "Fullstack Project",
    description:
      "Developed a travel app using Pug, Node.js, and mongoDB with JWT authentication, Stripe payments, role-based access, tour filtering, bookings, real-time notifications via WebSockets, and advanced user features.",
    stack: [
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Express.js" },
      { name: "Javascript" },
    ],
    image: "/projects/natours.png",
    links: {
      live: "https://vcdas-natours-app.onrender.com/",
      github: "https://github.com/vcdas123/natours",
    },
  },
];

const Projects = () => {
  const [project, setProject] = useState<ProjectIn>(PROJECTS_DATA[0]);
  return (
    <motion.section
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
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-3 h-[50%]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.id}
              </div>
              <h2 className="text-4xl font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                {project?.title}
              </h2>
              <h2 className="text-sm text-white">{project?.category}</h2>
              <p className="text-white/60">{project?.description}</p>
              <ul className="flex gap-2">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              <div className="border border-white/20"></div>

              <div className="flex items-center gap-4">
                <Link href={project?.links?.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <Link href={project?.links?.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <FaGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>GitHub Repo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={(data: SwiperIn) =>
                setProject(PROJECTS_DATA[data?.activeIndex])
              }
            >
              {PROJECTS_DATA.map((project: ProjectIn, index: number) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      <div></div>
                      <div className="">
                        <Image
                          src={project?.image}
                          sizes=""
                          fill
                          alt=""
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
