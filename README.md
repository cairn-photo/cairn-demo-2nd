# Cairn Backend

This repository now contains a TypeScript Fastify backend scaffold for Cairn.

## What is included

- Auth endpoints for sign up and sign in
- User profile endpoints
- Photo gallery and EXIF-ready endpoints
- Route recording endpoints with route state transitions
- Community post endpoints
- Map overview and clustered pin endpoints
- Calendar endpoint shaped for route timeline views
- Search endpoint
- Upload endpoint for route/gallery attachment flow

## Product model covered by this scaffold

- Private gallery with photo metadata and featured photos
- Upload photos after recording routes
- Select gallery photos to attach to a route or publish to community
- Own-versus-public map views
- Recording lifecycle: idle, recording, paused, finished
- EXIF-oriented photo metadata for camera, lens, ISO, exposure, and aperture

## Run locally

1. Copy `.env.example` to `.env` and adjust values.
2. Install dependencies with `npm install`.
3. Start development mode with `npm run dev`.

## Next step

The current scaffold uses in-memory responses so the API shape is ready before wiring a database layer. The next upgrade should be a persistence layer for users, photos, routes, posts, comments, and EXIF metadata.