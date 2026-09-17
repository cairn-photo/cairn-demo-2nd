import type { FastifyPluginAsync } from 'fastify';

export const uploadRoutes: FastifyPluginAsync = async (app) => {
  app.post('/photo', async () => ({
    uploadId: 'upload_demo',
    status: 'accepted',
    target: 'gallery-or-route'
  }));
};