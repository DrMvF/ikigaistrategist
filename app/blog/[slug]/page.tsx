import { getPosts, getPostBySlug } from '@/lib/ghost';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ SEO & Social Metadata pro Blogpost
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return {
    title: `${post.title} – Radical Sensitive Leadership`,
    description: post.custom_excerpt || post.excerpt || 'Thoughts from the field of Radical Sensitive Leadership.',
    openGraph: {
      title: post.title,
      description: post.custom_excerpt || post.excerpt || '',
      url: `https://www.radicalsensitiveleadership.com/blog/${post.slug}`,
      siteName: 'Radical Sensitive Leadership',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.custom_excerpt || post.excerpt || '',
    },
  };
}

export default async function BlogPostPage({
  // @ts-ignore – workaround for Next.js 15
  params,
}) {
  const post = await getPostBySlug(params.slug);

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
        <a href="/blog" className="text-sm underline hover:opacity-60">
          ← Back to Blog
        </a>
      </div>
    </main>
  );
}


