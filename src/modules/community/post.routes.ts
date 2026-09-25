import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const postSchema = z.object({
  text: z.string().min(1),
  photoIds: z.array(z.string()).default([]),
  routeId: z.string().optional(),
  isPublished: z.boolean().default(false)
});

export const postRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => ({ items: [], nextCursor: null }));

  app.post('/', async (request) => {
    const body = postSchema.parse(request.body);

    return {
      postId: 'post_demo',
      ...body,
      likes: 0,
      comments: []
    };
  });

  app.post<{ Params: { postId: string } }>('/:postId/comments', async (request) => {
    const { postId } = request.params;

    return {
      postId,
      commentId: 'comment_demo',
      text: (request.body as { text?: string } | undefined)?.text ?? ''
    };
  });
};