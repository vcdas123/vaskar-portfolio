import Link from "next/link";
import { getWork, getImageUrl } from "@/lib/api";
import { notFound } from "next/navigation";
import { PageFade } from "@/components/ui/PageFade";
import {
  IconBriefcase,
  IconBrandGithub,
  IconExternalLink,
} from "@tabler/icons-react";
import { StackIcons } from "@/components/ui/StackIcons";

export default async function WorkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const work = getWork(params.id);
  if (!work) notFound();

  return (
    <PageFade>
      <article className="flex flex-col gap-8">
        <div className="bg-white/5 rounded-2xl border border-white/5 backdrop-blur p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <IconBriefcase className="text-accent" size={20} stroke={2} />
            </div>
            <h1 className="text-xl xl:text-2xl font-semibold text-white">
              {work.title}
            </h1>
          </div>
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <p className="text-sm text-white/70">
              {work.year} · {work.category}
            </p>
            {work.stack?.length > 0 && (
              <StackIcons items={work.stack} size={18} />
            )}
          </div>
          <p className="text-base text-white/90 leading-relaxed">
            {work.description}
          </p>
        </div>

        {(work.links?.github || work.links?.live) && (
          <div className="flex flex-wrap gap-3">
            {work.links?.github && (
              <a
                href={work.links.github}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/5 text-white hover:bg-accent/20 hover:border-accent/30 transition-colors"
              >
                <IconBrandGithub size={20} stroke={2} />
                GitHub
              </a>
            )}
            {work.links?.live && (
              <a
                href={work.links.live}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 border border-accent/30 text-accent hover:bg-accent/30 transition-colors"
              >
                <IconExternalLink size={20} stroke={2} />
                Live Preview
              </a>
            )}
          </div>
        )}

        {work.thumbnail && (
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img
              src={
                work.thumbnail.startsWith("/uploads")
                  ? getImageUrl(work.thumbnail)
                  : work.thumbnail
              }
              alt={work.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {(
          work as { content?: { type: string; value?: string }[] }
        ).content?.map((block: { type: string; value?: string }, i: number) => (
          <div key={i} className="mb-6">
            {block.type === "heading" && (
              <h2 className="section-heading text-white mb-2">{block.value}</h2>
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
                className="w-full rounded-2xl my-4 shadow-md"
              />
            )}
          </div>
        ))}

        {work.images?.map((img: string, i: number) => (
          <img
            key={i}
            src={getImageUrl(img)}
            alt=""
            className="w-full rounded-2xl my-4 shadow-md"
          />
        ))}

        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-hover transition-colors"
        >
          ← Back to Works
        </Link>
      </article>
    </PageFade>
  );
}
