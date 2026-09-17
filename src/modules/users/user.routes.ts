import type { FastifyPluginAsync } from 'fastify';

const currentUser = {
  id: 'user_demo',
  username: 'demo',
  avatarUrl: null,
  age: null,
  cameraBrands: ['Fujifilm'],
  yearsOfPhotography: null
};

export const userRoutes: FastifyPluginAsync = async (app) => {
  app.get('/me', async () => currentUser);

  app.get('/:userId', async (request) => ({
    userId: request.params.userId,
    username: 'placeholder',
    featuredPhotoIds: [],
    recentRouteIds: []
  }));
};