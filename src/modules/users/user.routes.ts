import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

type CurrentUser = {
  id: string;
  username: string;
  avatarUrl: string | null;
  age: number | null;
  cameraBrands: string[];
  yearsOfPhotography: number | null;
};

const updateAgeSchema = z.object({
  age: z.number().int().positive().max(120)
});

let currentUser: CurrentUser = {
  id: 'user_demo',
  username: 'demo',
  avatarUrl: null,
  age: null,
  cameraBrands: ['Fujifilm'],
  yearsOfPhotography: null
};

export const userRoutes: FastifyPluginAsync = async (app) => {
  app.get('/me', async () => currentUser);

  app.post('/me/age', async (request, reply) => {
    const body = updateAgeSchema.parse(request.body);

    currentUser = {
      ...currentUser,
      age: body.age
    };

    return reply.send(currentUser);
  });

  app.get<{ Params: { userId: string } }>('/:userId', async (request) => {
    const { userId } = request.params;

    return {
      userId,
      username: 'placeholder',
      featuredPhotoIds: [],
      recentRouteIds: []
    };
  });
};