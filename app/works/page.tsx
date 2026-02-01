import Link from "next/link";
import { getWorks, getImageUrl } from "@/lib/api";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { PageFade } from "@/components/ui/PageFade";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StackIcons } from "@/components/ui/StackIcons";
import { IconBriefcase } from "@tabler/icons-react";

export default async function WorksPage() {
  const works = getWorks();

  return (
    <PageFade>
      <div className="flex flex-col gap-16">
        <ScrollReveal>
          <div>
            <h2 className="section-heading mb-6 flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <IconBriefcase size={18} className="text-accent" stroke={2} />
              </div>
              <span className="text-white">Works</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {works.map((work, i) => (
                <AnimatedCard key={work._id} delay={i * 0.08}>
                  <div className="group bg-white/0 rounded-2xl overflow-hidden border border-white/5 backdrop-blur transition-all duration-300 card-hover">
                    <Link href={`/works/${work._id}`} className="block">
                      <div className="p-4 pt-4 pb-0">
                        <div className="aspect-video overflow-hidden rounded-lg bg-white/5">
                          {work.thumbnail?.startsWith("/uploads") ? (
                            <img
                              src={getImageUrl(work.thumbnail)}
                              alt={work.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={work.thumbnail || "/projects/natours.png"}
                              alt={work.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                      <div className="p-5 pt-4">
                        <h2 className="text-lg font-semibold text-white group-hover:text-accent transition-colors mb-2">
                          {work.title}
                        </h2>
                        <p className="text-sm text-white/70 mb-3 leading-relaxed line-clamp-2">
                          {work.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-accent/30 text-accent text-xs font-medium">
                            {work.year}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                            {work.category}
                          </span>
                          {work.stack?.length > 0 && (
                            <StackIcons items={work.stack} size={16} />
                          )}
                        </div>
                      </div>
                    </Link>
                    {(work.links?.github || work.links?.live) && (
                      <div className="px-5 pb-5 flex gap-4">
                        {work.links?.github && (
                          <a
                            href={work.links.github}
                            target="_blank"
                            rel="noopener"
                            className="text-sm text-accent hover:underline"
                          >
                            GitHub
                          </a>
                        )}
                        {work.links?.live && (
                          <a
                            href={work.links.live}
                            target="_blank"
                            rel="noopener"
                            className="text-sm text-accent hover:underline"
                          >
                            Live
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageFade>
  );
}
