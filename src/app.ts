import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { healthRoutes } from './modules/health/health.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { userRoutes } from './modules/users/user.routes.js';
import { photoRoutes } from './modules/photos/photo.routes.js';
import { routeRoutes } from './modules/routes/route.routes.js';
import { postRoutes } from './modules/community/post.routes.js';
import { mapRoutes } from './modules/map/map.routes.js';
import { calendarRoutes } from './modules/calendar/calendar.routes.js';
import { searchRoutes } from './modules/search/search.routes.js';
import { uploadRoutes } from './modules/uploads/upload.routes.js';
import type { AppEnv } from './config/env.js';

export const buildApp = (env: AppEnv): FastifyInstance => {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug'
    }
  });

  app.decorate('env', env);

  void app.register(cors, {
    origin: true,
    credentials: true
  });

  void app.register(multipart, {
    limits: {
      fileSize: 25 * 1024 * 1024
    }
  });

  void app.register(healthRoutes, { prefix: '/health' });
  void app.register(authRoutes, { prefix: '/auth' });
  void app.register(userRoutes, { prefix: '/users' });
  void app.register(photoRoutes, { prefix: '/photos' });
  void app.register(routeRoutes, { prefix: '/routes' });
  void app.register(postRoutes, { prefix: '/community/posts' });
  void app.register(mapRoutes, { prefix: '/map' });
  void app.register(calendarRoutes, { prefix: '/calendar' });
  void app.register(searchRoutes, { prefix: '/search' });
  void app.register(uploadRoutes, { prefix: '/uploads' });

  app.get('/', async () => ({
    service: 'cairn-backend',
    version: '0.1.0',
    features: [
      'auth',
      'profiles',
      'private gallery',
      'route recording',
      'community posts',
      'map view',
      'calendar view',
      'photo uploads',
      'EXIF metadata'
    ]
  }));

  return app;
};