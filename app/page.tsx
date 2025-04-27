import Contact from "@/components/contact/Contact";
import LeftSection from "@/components/home/leftSection/LeftSection";
import RightSection from "@/components/home/rightSection/RightSection";
import Stats from "@/components/home/Stats";
import Projects from "@/components/projects/Projects";
import Resume from "@/components/resume/Resume";
import Services from "@/components/Services/Services";

export default function Home() {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <LeftSection />
          <RightSection />
        </div>
      </div>
      <Stats />
      <br />
      <br />
      <div className="flex flex-col gap-[100px]">
        <Services />
        <Projects />
        <Resume />
        <Contact />
      </div>
    </section>
  );
}
