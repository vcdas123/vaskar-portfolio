import Link from "next/link";
import { getBlog, getImageUrl } from "@/lib/api";
import { notFound } from "next/navigation";
import { PageFade } from "@/components/ui/PageFade";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { StackIcons } from "@/components/ui/StackIcons";
import { IconArticle } from "@tabler/icons-react";

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = getBlog(params.id);
  if (!blog) notFound();

  return (
    <PageFade>
      <article className="flex flex-col gap-8">
        <div className="bg-white/5 rounded-2xl border border-white/5 backdrop-blur p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <IconArticle className="text-accent" size={20} stroke={2} />
            </div>
            <h1 className="text-xl xl:text-2xl font-semibold text-white">
              {blog.title}
            </h1>
          </div>
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <p className="text-sm text-white/70">
              {new Date(blog.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            {blog.categories?.length > 0 && (
              <StackIcons items={blog.categories} size={18} />
            )}
          </div>
          <p className="text-base text-white/90 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        {blog.thumbnail && (
          <div className="rounded-2xl overflow-hidden border border-white/5">
            <img
              src={getImageUrl(blog.thumbnail)}
              alt={blog.title}
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none space-y-6">
          {blog.content?.map(
            (block: { type: string; value?: string }, i: number) => (
              <div key={i}>
                {block.type === "heading" && (
                  <h2 className="section-heading text-white mb-2 mt-8">
                    {block.value}
                  </h2>
                )}
                {block.type === "paragraph" && (
                  <p className="text-base text-white/90 leading-relaxed">
                    {block.value}
                  </p>
                )}
                {block.type === "image" && block.value && (
                  <img
                    src={getImageUrl(block.value)}
                    alt=""
                    className="w-full rounded-2xl my-4 border border-white/5"
                  />
                )}
                {block.type === "code" && block.value && (
                  <CodeBlock
                    code={block.value}
                    language={
                      (block as { language?: string }).language || "typescript"
                    }
                  />
                )}
                {block.type === "link" && block.value && (
                  <a
                    href={block.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-hover hover:underline break-all"
                  >
                    {(block as { label?: string }).label ||
                      "View source on GitHub →"}
                  </a>
                )}
              </div>
            )
          )}
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-hover transition-colors"
        >
          ← Back to Blog
        </Link>
      </article>
    </PageFade>
  );
}
