"use client";
import SliderBtn from "@/components/projects/SliderBtn";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TabsContent } from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { PiMouseLeftClickFill } from "react-icons/pi";
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

export interface RestIn {
  id: string;
  title: string;
  desc: string;
  wordsToHighlight?: string[];
}

export const REST_DATA: RestIn[] = [
  {
    id: "01",
    title: "Custom React Table Hook",
    desc: "Designed and implemented a highly customizable, reusable React hook to enhance table components with advanced features, including dynamic filtering, global search functionality, column sorting, and pagination. The hook leverages fuzzy search algorithms to provide accurate and flexible search results, incorporating matched text highlighting to improve user interaction and readability. Built with a focus on scalability and modularity, this solution seamlessly integrates with any table component, enabling developers to implement powerful table functionalities without significant overhead. The hook is optimized for performance and includes robust error handling and type safety using TypeScript, ensuring reliability and ease of use in diverse application scenarios.",
    wordsToHighlight: [
      "filtering",
      "global search",
      "column sorting",
      "pagination",
      "fuzzy",
      "TypeScript",
      "reusable React hook",
      "matched text highlighting",
      "integrates with any table component",
    ],
  },
  {
    id: "02",
    title: "Grid Layout",
    desc: "Developed a modular and highly flexible Grid component in React with TypeScript, utilizing Flexbox and CSS Grid to provide customizable layouts. This component allows for adjustable column spans and efficient row/column gutter management, enabling developers to create complex, responsive designs with ease. By leveraging the Compound Component Pattern, the Grid component ensures clear separation of concerns and improves component reusability, making it a powerful addition to any project. The design and structure allow for smooth integration and scalability in various layout scenarios.",
    wordsToHighlight: [
      "Grid component",
      "column spans",
      "smooth integration",
      "Compound Component Pattern",
    ],
  },
  {
    id: "03",
    title: "Select Component",
    desc: "Built a reusable Select component in React with TypeScript for type safety, free from the limitations of the native HTML <select> tag. It supports customizable options, labels, values, and icons for both the selected value and dropdown options. The component features dynamic positioning, a clear selection button, and is styled with TailwindCSS. It also offers flexible configuration for width, placeholder, and border visibility, ensuring seamless integration into various web applications.",
    wordsToHighlight: [
      "customizable options",
      "icons",
      "limitations",
      "integration",
      "flexible configuration",
    ],
  },
];

interface HighlightProps {
  text: string;
  wordsToHighlight: string[];
}

const HighlightText: React.FC<HighlightProps> = ({
  text,
  wordsToHighlight,
}) => {
  const regex = new RegExp(`\\b(${wordsToHighlight.join("|")})\\b`, "gi");

  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        const isMatch = wordsToHighlight.some(
          word => word.toLowerCase() === part.toLowerCase()
        );
        return isMatch ? (
          <span key={index} className="font-semibold text-red-500">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};

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
        <div>
          <Tabs defaultValue={"0"} className="flex flex-col gap-[60px]">
            <TabsList className="flex h-full w-full max-w-[380px] mx-auto xl:mx-0">
              <TabsTrigger value={"0"} className="py-2 px-3 rounded-full">
                Highlights
              </TabsTrigger>
              <TabsTrigger value={"1"} className="py-2 px-4 rounded-full">
                Remaining ({REST_DATA?.length})
              </TabsTrigger>
            </TabsList>
            <div className="min-h-[70vh] w-full">
              <TabsContent value={"0"} className="mt-0 w-full h-full">
                <div className="flex flex-col xl:flex-row xl:gap-[30px]">
                  <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none group">
                    <div className="flex flex-col gap-3 h-[50%]">
                      <div className="text-6xl leading-none font-extrabold text-transparent text-outline group-hover:text-outline-hover transition-all duration-500">
                        {project.id}
                      </div>
                      <h2 className="text-4xl font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                        {project?.title}
                      </h2>
                      <h2 className="text-sm text-white">
                        {project?.category}
                      </h2>
                      <p className="text-white/60">{project?.description}</p>
                      <div className="flex gap-2 flex-wrap">
                        {project.stack.map((item, index) => {
                          return (
                            <p key={index} className="text-xl text-accent">
                              {item.name}
                              {index !== project.stack.length - 1 && ","}
                            </p>
                          );
                        })}
                      </div>
                      <div className="border border-white/20"></div>

                      <div className="flex items-center gap-4">
                        <Link href={project?.links?.live}>
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                                <BsArrowUpRight className="text-white text-3xl hover:text-accent" />
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
                                <FaGithub className="text-white text-3xl hover:text-accent" />
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
                      className="xl:h-[520px] mb-12 rounded-xl relative cursor-pointer"
                      onSlideChange={(data: SwiperIn) =>
                        setProject(PROJECTS_DATA[data?.activeIndex])
                      }
                    >
                      {PROJECTS_DATA.map(
                        (project: ProjectIn, index: number) => {
                          return (
                            <SwiperSlide key={index} className="rounded-xl">
                              <div className="flex justify-center items-center bg-pink-50/5 rounded-xl">
                                <img
                                  src={project?.image}
                                  className="object-cover"
                                  alt={project?.title}
                                />
                              </div>
                            </SwiperSlide>
                          );
                        }
                      )}

                      <SliderBtn
                        containerStyles="hidden xl:flex gap-2 absolute right-0 bottom-0 z-20 justify-between xl:w-max xl:justify-none m-3"
                        btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[40px] h-[40px] flex justify-center items-center transition-all cursor-pointer rounded-full shadow-lg disabled:text-gray-500 disabled:cursor-not-allowed disabled:bg-gray-500/30"
                      />
                    </Swiper>
                    <div className="flex justify-end">
                      <p className="text-sm text-white/50">
                        Total Projects :{" "}
                        {PROJECTS_DATA?.length?.toString()?.padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value={"1"} className="mt-0 w-full h-full">
                <div className="flex flex-col gap-10">
                  {REST_DATA?.map((item: RestIn) => {
                    return (
                      <div
                        key={item?.id}
                        className="flex-1 flex flex-col justify-center gap-2 group cursor-pointer"
                      >
                        <div className="w-full">
                          <div className="text-4xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                            {item?.id}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <h2 className="text-2xl font-bold leading-none group-hover:text-accent transition-all duration-500">
                            {item?.title}
                          </h2>
                          <div className="flex items-center gap-4">
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger className="w-[40px] h-[40px] rounded-full bg-white/5 flex justify-center items-center group">
                                  <PiMouseLeftClickFill className="text-white text-lg " />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Click For More Details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>

                        <p className="text-white/60 text-sm">
                          <HighlightText
                            text={item?.desc}
                            wordsToHighlight={item?.wordsToHighlight || []}
                          />
                        </p>
                        <div className="border-b border-white/20 w-full"></div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
