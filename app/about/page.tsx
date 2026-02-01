import { getProfile, getExperience, getEducation, getSkills } from "@/lib/api";
import Link from "next/link";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { PageFade } from "@/components/ui/PageFade";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AboutSkillBadge } from "@/components/about/AboutSkillBadge";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconSchool,
  IconTools,
} from "@tabler/icons-react";

export default async function AboutPage() {
  let profile: any = null;
  let experience: any[] = [];
  let education: any[] = [];
  let skills: any[] = [];
  profile = getProfile();
  experience = getExperience();
  education = getEducation();
  skills = getSkills();

  const detailItems = profile
    ? [
        { label: "Name", value: profile.name, Icon: IconUser },
        { label: "Title", value: profile.title, Icon: IconBriefcase },
        { label: "Email", value: profile.contact?.email, Icon: IconMail },
        { label: "Phone", value: profile.contact?.phone, Icon: IconPhone },
        { label: "Address", value: profile.contact?.address, Icon: IconMapPin },
      ]
    : [];

  return (
    <PageFade>
      <div className="flex flex-col gap-16">
        {/* My Details */}
        <ScrollReveal>
          <div>
            <h2 className="section-heading mb-6 flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <IconUser size={18} className="text-accent" stroke={2} />
              </div>
              <span className="text-white">My</span>{" "}
              <span className="text-white/70">Details</span>
            </h2>
            <AnimatedCard>
              <div className="bg-white/0 p-8 rounded-2xl border border-white/5 backdrop-blur transition-all duration-300 card-hover">
                <div className="space-y-5">
                  {detailItems.map(
                    item =>
                      item.value && (
                        <div
                          key={item.label}
                          className="flex items-start gap-4"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                            <item.Icon
                              className="text-accent"
                              size={18}
                              stroke={2}
                            />
                          </div>
                          <div>
                            <p className="text-sm text-white/70 font-medium">
                              {item.label}
                            </p>
                            <p className="text-base text-white font-medium">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      )
                  )}
                </div>
                {profile?.description && (
                  <p className="text-sm text-white/80 leading-relaxed mt-6 pt-6 border-t border-white/5">
                    {profile.description}
                  </p>
                )}
              </div>
            </AnimatedCard>
          </div>
        </ScrollReveal>

        {/* Professional Experience */}
        <ScrollReveal>
          <div>
            <h2 className="section-heading mb-6 flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <IconBriefcase size={18} className="text-accent" stroke={2} />
              </div>
              <span className="text-white">Professional</span>{" "}
              <span className="text-white/70">Experience</span>
            </h2>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <AnimatedCard key={exp._id} delay={i * 0.08}>
                  <div className="bg-white/0 p-6 rounded-2xl border border-white/5 backdrop-blur transition-all duration-300 card-hover">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                          <IconBriefcase
                            className="text-accent"
                            size={22}
                            stroke={2}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {exp.company}
                          </h3>
                          <p className="text-accent font-medium text-sm mt-0.5">
                            {exp.position}
                          </p>
                          <p className="text-sm text-white/70 mt-1">
                            {exp.duration}
                            {(exp as { location?: string }).location &&
                              ` · ${(exp as { location?: string }).location}`}
                          </p>
                        </div>
                      </div>
                      {exp.duration?.toLowerCase().includes("present") && (
                        <span className="px-2.5 py-1 rounded bg-accent/30 text-accent text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    {(exp as { points?: string[] }).points?.length ? (
                      <ul className="space-y-2 text-sm text-white/80 leading-relaxed list-disc list-inside pl-2">
                        {(exp as { points: string[] }).points.map((p, j) => (
                          <li key={j} className="leading-relaxed">
                            {p}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Education */}
        {education?.length > 0 && (
          <ScrollReveal>
            <div>
              <h2 className="section-heading mb-6 flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                  <IconSchool size={18} className="text-accent" stroke={2} />
                </div>
                <span className="text-white">Education</span>
              </h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <AnimatedCard key={edu._id} delay={i * 0.08}>
                    <div className="bg-white/0 p-6 rounded-2xl border border-white/5 flex gap-4 backdrop-blur transition-all duration-300 card-hover">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                        <IconSchool
                          className="text-accent"
                          size={22}
                          stroke={2}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-accent font-medium text-sm mt-1">
                          {edu.duration}
                        </p>
                        <p className="text-sm text-white/70 mt-0.5">
                          {edu.institute}
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <ScrollReveal>
            <div>
              <h2 className="section-heading mb-6 flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                  <IconTools size={18} className="text-accent" stroke={2} />
                </div>
                <span className="text-white">Skills</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((s, i) => (
                  <AnimatedCard key={s._id} delay={i * 0.02}>
                    <AboutSkillBadge
                      label={s.label}
                      color={s.color}
                      needsLightIcon={s.needsLightIcon}
                    />
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        <div>
          <Link
            href="/"
            className="text-accent font-medium hover:underline transition-opacity inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </PageFade>
  );
}
