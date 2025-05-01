import GhostContentAPI from '@tryghost/content-api';

// Typ für einen Ghost-Post
export type GhostPost = {
  id: string;
  title: string;
  slug: string;
  html: string;
  published_at: string;
};

// Ghost API initialisieren
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL!,
  key: process.env.GHOST_API_KEY!,
  version: 'v5.0',
});

// Alle Posts abrufen
export async function getPosts(): Promise<GhostPost[]> {
  return await api.posts
    .browse({ limit: 'all' })
    .catch((err: unknown) => {
      console.error('[Ghost] Fehler beim Laden der Posts:', err);
      return [];
    });
}

// Einzelnen Post per Slug abrufen
export async function getPostBySlug(slug: string): Promise<GhostPost> {
  return await api.posts
    .read({ slug }, { formats: ['html'] })
    .catch((err: unknown) => {
      console.error(`[Ghost] Post mit Slug "${slug}" nicht gefunden:`, err);
      throw new Error('Post not found');
    });
}
