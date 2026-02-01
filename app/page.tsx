import Link from "next/link";
import {
  getProfile,
  getFeaturedWorks,
  getBlogs,
  getSkills,
  getWorks,
  getEducation,
  getExperience,
  getJourneySummary,
  getImageUrl,
} from "@/lib/api";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { PageFade } from "@/components/ui/PageFade";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import LeftSection from "@/components/home/leftSection/LeftSection";
import RightSection from "@/components/home/rightSection/RightSection";
import Stats from "@/components/home/Stats";
import { getSkillIconColor } from "@/data/site-data";
import { SkillToolboxCard } from "@/components/home/SkillToolboxCard";
import { StackIcons } from "@/components/ui/StackIcons";
import {
  IconArticle,
  IconBriefcase,
  IconRoute,
  IconTools,
} from "@tabler/icons-react";
import { getBlogIcon } from "@/data/site-data";
import { JourneyStepper } from "@/components/home/JourneyStepper";

export default async function HomePage() {
  const profile = getProfile();
  const featuredWorks = getFeaturedWorks();
  const recentBlogs = getBlogs(2);
  const skills = getSkills();
  const works = getWorks();
  const education = getEducation();
  const experience = getExperience();
  const journeySummary = getJourneySummary();

  const name = profile?.name || "Vaskar Chandra Das";
  const title = profile?.title || "Software Developer";
  const description =
    profile?.description ||
    "I enjoy delivering engaging digital solutions and am skilled in using multiple programming languages and technologies.";
  const profileImage = profile?.profileImage
    ? getImageUrl(profile.profileImage)
    : "/profile/bg-profile.png";

  const startYear = 2023;
  const yearsExp = Math.max(1, new Date().getFullYear() - startYear);
  const stats = [
    { count: yearsExp, label: "Years of experience" },
    { count: works?.length || 7, label: "Projects completed" },
    { count: skills?.length || 13, label: "Technologies mastered" },
  ];

  return (
    <PageFade>
      <div className="flex flex-col gap-16">
        {/* Hero */}
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-4 xl:pb-12 gap-12">
          <LeftSection
            title={title}
            name={name}
            description={description}
            socialLinks={profile?.socialLinks}
          />
          <RightSection profileImage={profileImage} alt={name} />
        </div>

        <ScrollReveal>
          <Stats stats={stats} />
        </ScrollReveal>

        {/* My Journey */}
        <ScrollReveal>
          <div>
            <h2 className="section-heading mb-2 flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <IconRoute size={18} className="text-accent" stroke={2} />
              </div>
              <span className="text-white">My</span>{" "}
              <span className="text-white/70">Journey</span>
            </h2>
            {journeySummary && (
              <p className="mb-6 text-sm text-white/80 leading-relaxed">
                {journeySummary}
              </p>
            )}
            <JourneyStepper
              education={education || []}
              experience={experience || []}
            />
          </div>
        </ScrollReveal>

        {/* Design & Development Toolbox */}
        {skills?.length > 0 && (
          <ScrollReveal>
            <div>
              <h2 className="section-heading mb-2 flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                  <IconTools size={18} className="text-accent" stroke={2} />
                </div>
                <span className="text-white">Design</span>{" "}
                <span className="text-white/70">& Development Toolbox</span>
              </h2>
              <p className="text-sm text-white/70 mb-6">
                A comprehensive suite of tools that I use to design, build, and
                bring ideas to life.
              </p>
              <div className="flex gap-4 flex-wrap">
                {skills.map((s, i) => (
                  <AnimatedCard key={s._id} delay={i * 0.02}>
                    <SkillToolboxCard
                      label={s.label}
                      iconColor={getSkillIconColor(s)}
                      size={32}
                    />
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Recent posts */}
        <ScrollReveal>
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="section-heading flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                  <IconArticle size={18} className="text-accent" stroke={2} />
                </div>
                <span className="text-white">Recent</span>{" "}
                <span className="text-white/70">posts</span>
              </h2>
              <Link
                href="/blog"
                className="text-accent text-base font-medium hover:underline hover:text-accent-hover transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {recentBlogs.map((post, i) => {
                const BlogIcon = getBlogIcon(i, post._id);
                return (
                <AnimatedCard key={post._id} delay={i * 0.1}>
                  <Link
                    href={`/blog/${post._id}`}
                    className="group block h-full bg-white/0 p-6 rounded-2xl border border-white/5 backdrop-blur transition-all duration-300 card-hover"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                        <BlogIcon size={20} className="text-accent" stroke={2} />
                      </div>
                      <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors flex-1">
                        {post.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <p className="text-sm text-white/70">
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      {post.categories?.length > 0 && (
                        <StackIcons items={post.categories} size={16} />
                      )}
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </Link>
                </AnimatedCard>
              );
            })}
            </div>
          </div>
        </ScrollReveal>

        {/* Featured works */}
        <ScrollReveal>
          <div>
            <h2 className="section-heading mb-6 flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <IconBriefcase size={18} className="text-accent" stroke={2} />
              </div>
              <span className="text-white">Featured</span>{" "}
              <span className="text-white/70">works</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredWorks.map((work, i) => (
                <AnimatedCard key={work._id} delay={i * 0.1}>
                  <Link
                    href={`/works/${work._id}`}
                    className="block bg-white/0 rounded-xl overflow-hidden border border-white/5 backdrop-blur transition-all duration-300 card-hover"
                  >
                    <div className="p-4 pt-4 pb-0">
                      <div className="aspect-[4/3] max-h-32 overflow-hidden rounded-lg bg-white/5">
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
                    <div className="p-4 pt-4">
                      <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors mb-1">
                        {work.title}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed line-clamp-2 mb-3">
                        {work.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-accent/30 text-accent text-xs font-medium">
                          {work.year}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-xs">
                          {work.category}
                        </span>
                        {work.stack?.length > 0 && (
                          <StackIcons items={work.stack} size={16} />
                        )}
                      </div>
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageFade>
  );
}
