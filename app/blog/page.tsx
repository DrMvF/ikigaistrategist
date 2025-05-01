import { getPosts } from '@/lib/ghost';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-4xl mb-12">Blog Deep Flow</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl underline hover:opacity-60 transition">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">
              {new Date(post.published_at).toLocaleDateString('de-DE')}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

