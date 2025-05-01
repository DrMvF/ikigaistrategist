import { getPosts, getPostBySlug } from '@/lib/ghost';
import type { Post } from '@tryghost/content-api'; // ✅ Schritt 1
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post: Post = await getPostBySlug(params.slug); // ✅ Schritt 2

  return (
    <article style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}

