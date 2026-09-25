import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const photoCreateSchema = z.object({
  title: z.string().min(1).optional(),
  caption: z.string().optional(),
  routeId: z.string().optional(),
  isFeatured: z.boolean().optional(),
  publishState: z.enum(['draft', 'archived', 'featured', 'published']).default('draft')
});

export const photoRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => ({ items: [], nextCursor: null }));

  app.post('/', async (request) => {
    const body = photoCreateSchema.parse(request.body ?? {});

    return {
      photoId: 'photo_demo',
      ...body,
      exif: {
        camera: 'unknown',
        lens: 'unknown',
        iso: null,
        exposure: null,
        aperture: null,
        capturedAt: null,
        location: null
      }
    };
  });

  app.get<{ Params: { photoId: string } }>('/:photoId', async (request) => {
    const { photoId } = request.params;

    return {
      photoId,
      visibility: 'private',
      exif: {
        camera: 'unknown',
        lens: 'unknown',
        iso: 0,
        exposure: '1/250',
        aperture: 'f/2.8'
      }
    };
  });
};