import type { FastifyPluginAsync } from 'fastify';

export const mapRoutes: FastifyPluginAsync = async (app) => {
  app.get('/overview', async () => ({
    mode: 'own-and-public',
    clusterZoomThreshold: 12,
    mapBrightness: 'progressive'
  }));

  app.get('/pins', async () => ({
    pins: [],
    clusters: []
  }));
};