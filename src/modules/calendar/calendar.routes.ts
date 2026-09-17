import type { FastifyPluginAsync } from 'fastify';

export const calendarRoutes: FastifyPluginAsync = async (app) => {
  app.get('/routes', async () => ({
    calendar: [],
    representation: 'apple-fitness-style-route-rings'
  }));
};