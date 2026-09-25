import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const routeStateSchema = z.enum(['idle', 'recording', 'paused', 'finished']);

export const routeRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => ({ items: [], nextCursor: null }));

  app.post('/', async (request) => {
    const body = z.object({
      title: z.string().min(1).optional(),
      state: routeStateSchema.default('idle')
    }).parse(request.body ?? {});

    return {
      routeId: 'route_demo',
      ...body,
      pins: [],
      photoIds: []
    };
  });

  app.patch<{ Params: { routeId: string } }>('/:routeId/state', async (request) => {
    const { routeId } = request.params;

    return {
      routeId,
      state: routeStateSchema.parse((request.body as { state?: string } | undefined)?.state ?? 'idle')
    };
  });
};