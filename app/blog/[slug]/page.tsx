import { getPosts, getPostBySlug } from '@/lib/ghost';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  return (
    <article style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p>{new Date(post.published_at).toLocaleDateString('de-DE')}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}