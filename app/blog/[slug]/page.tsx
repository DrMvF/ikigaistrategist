import { getPosts, getPostBySlug } from '@/lib/ghost';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ Vercel-Fix: Params kommt als Promise – also explizit mit await behandeln
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-4xl mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-12">
        {new Date(post.published_at).toLocaleDateString('de-DE')}
      </p>
      <article
        className="prose prose-lg prose-neutral"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <div className="mt-16">
        <a href="/blog" className="text-sm underline hover:opacity-60">← Zurück zum Blog</a>
      </div>
      <div className="mt-12">
        <a
          href="https://DEIN-GHOST-NAME.ghost.io/#/portal/signup"
          className="inline-block border px-4 py-2 text-sm hover:bg-gray-100 transition"
        >
          Newsletter abonnieren
        </a>
      </div>
    </main>
  );
}
