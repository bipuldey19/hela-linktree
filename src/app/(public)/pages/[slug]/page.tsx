import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogContent from "@/components/public/BlogContent";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPage(slug: string) {
  return prisma.page.findUnique({ where: { slug } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page || !page.active) {
    return { title: "Not Found" };
  }

  return {
    title: page.title,
    description: page.title,
  };
}

export async function generateStaticParams() {
  const pages = await prisma.page.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return pages.map((p) => ({ slug: p.slug }));
}

export default async function StaticPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page || !page.active) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-5 py-12 animate-fade-in-up">
      <header className="mb-10">
        <h1
          className="text-3xl sm:text-4xl text-stone-900 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {page.title}
        </h1>
        <div className="mt-3 h-1 w-16 rounded-full bg-primary/30" />
      </header>

      <BlogContent html={page.content} />
    </article>
  );
}
