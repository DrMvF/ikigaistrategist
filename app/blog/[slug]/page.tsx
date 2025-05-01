import { getPosts, getPostBySlug } from '@/lib/ghost';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ Hier kommt der wichtige Fix:
type Props = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  return (
    <article style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}

