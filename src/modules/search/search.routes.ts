import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const searchSchema = z.object({
  q: z.string().min(1),
  type: z.enum(['photos', 'routes', 'posts', 'users', 'all']).default('all')
});

export const searchRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async (request) => {
    const query = searchSchema.parse(request.query);

    return {
      query,
      results: []
    };
  });
};