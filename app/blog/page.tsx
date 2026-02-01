import Link from "next/link";
import { getBlogs } from "@/lib/api";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { PageFade } from "@/components/ui/PageFade";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StackIcons } from "@/components/ui/StackIcons";
import { IconArticle } from "@tabler/icons-react";
import { getBlogIcon } from "@/data/site-data";

export default async function BlogPage() {
  const blogs = getBlogs();

  return (
    <PageFade>
      <div className="flex flex-col gap-16">
        <ScrollReveal>
          <div>
            <h2 className="section-heading mb-6 flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <IconArticle size={18} className="text-accent" stroke={2} />
              </div>
              <span className="text-white">Blog</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogs.map((post, i) => {
                const BlogIcon = getBlogIcon(i, post._id);
                return (
                <AnimatedCard key={post._id} delay={i * 0.08}>
                  <Link
                    href={`/blog/${post._id}`}
                    className="group block bg-white/0 rounded-2xl overflow-hidden border border-white/5 backdrop-blur transition-all duration-300 card-hover"
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                          <BlogIcon size={20} className="text-accent" stroke={2} />
                        </div>
                        <h2 className="text-base font-semibold text-white group-hover:text-accent transition-colors flex-1">
                          {post.title}
                        </h2>
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
                    </div>
                  </Link>
                </AnimatedCard>
              );
            })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageFade>
  );
}
