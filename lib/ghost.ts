// lib/ghost.ts
import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL!,
  key: process.env.GHOST_API_KEY!,
  version: 'v5.0',
});

export async function getPosts() {
  return await api.posts
    .browse({ limit: 'all' })
    .catch((err) => console.error(err));
}

export async function getPostBySlug(slug: string) {
  return await api.posts
    .read({ slug }, { formats: ['html'] })
    .catch((err) => console.error(err));
}
