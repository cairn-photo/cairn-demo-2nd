import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const signUpSchema = z.object({
  identifier: z.string().min(3),
  username: z.string().min(3),
  age: z.number().int().positive().optional(),
  avatarUrl: z.string().url().optional()
});

const signInSchema = z.object({
  identifier: z.string().min(3)
});

export const authRoutes: FastifyPluginAsync = async (app) => {
  app.post('/sign-up', async (request) => {
    const body = signUpSchema.parse(request.body);

    return {
      userId: `user_${body.username.toLowerCase()}`,
      profile: body,
      nextStep: 'verify-account'
    };
  });

  app.post('/sign-in', async (request) => {
    const body = signInSchema.parse(request.body);

    return {
      token: `dev-token-for-${body.identifier}`,
      expiresIn: '7d'
    };
  });
};