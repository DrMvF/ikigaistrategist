import Link from 'next/link';
import { getPosts } from '@/lib/ghost';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
