# Cairn Backend Architecture

## 1. Scope

This backend is designed around the Cairn product concept: a personal photography route tracker and community feed. It supports:

- user sign-in / sign-up
- private photo gallery
- route recording with state transitions
- EXIF-driven metadata extraction and display
- map-based visualization of personal and community content
- calendar view for route history
- community publishing and social interaction
- upload flows for gallery, route, and shared content

## 2. Core principles

1. Separate domain modules by feature, not by database table.
2. Keep app-level concerns like env config, validation, and service wiring centralized.
3. Build API contracts first so iOS app and web app can consume predictable endpoints.
4. Treat EXIF, GPS, and image metadata as first-class domain data.
5. Use a private/gallery-first model with explicit publish state transitions.

## 3. Folder structure

```text
src/
  app.ts
  main.ts
  config/
    env.ts
  lib/
    http.ts
    store.ts
  modules/
    auth/
      auth.routes.ts
    users/
      user.routes.ts
    photos/
      photo.routes.ts
    routes/
      route.routes.ts
    community/
      post.routes.ts
      community.types.ts
    map/
      map.routes.ts
    calendar/
      calendar.routes.ts
    search/
      search.routes.ts
    uploads/
      upload.routes.ts
    health/
      health.routes.ts
  types/
    fastify.d.ts
```

## 4. Domain modules and responsibilities

### Auth
- sign-up
- sign-in
- token issuance in later production implementation
- user identity and onboarding data

### Users
- profile retrieval
- featured images
- route history summary
- camera brand history and photography years

### Photos
- CRUD for gallery items
- EXIF metadata payloads
- featured vs archived vs published states
- relation to route and user records

### Routes
- record route lifecycle: idle / recording / paused / finished
- link route to photo pins and timeline events
- support manual pin insertion during recording

### Community
- posts, comments, likes, and collection state
- public vs private visibility
- publish pipeline from draft to featured to published

### Map
- personal view vs public view
- cluster rendering threshold and pin aggregation
- brightness progression based on contributor activity

### Calendar
- route history visualization using Apple Fitness style patterns
- route rings and timeline summary

### Search
- find users, photos, routes, and posts by tags, camera name, lens, or location
- future support for semantic and fuzzy matching

### Uploads
- handle photo upload from app gallery or captured route flow
- normalize asset target: private gallery, route, or post

## 5. Proposed persistence model

The following tables are the expected long-term database design:

- users
  - id
  - username
  - email_or_phone
  - age
  - avatar_url
  - created_at

- user_profiles
  - user_id
  - photography_years
  - preferred_cameras
  - favorite_lenses
  - bio

- routes
  - id
  - user_id
  - title
  - state
  - started_at
  - ended_at
  - geo_path
  - created_at

- photos
  - id
  - user_id
  - route_id
  - storage_key
  - original_url
  - compressed_url
  - title
  - caption
  - visibility
  - is_featured
  - exif_json
  - created_at

- photo_pins
  - id
  - photo_id
  - route_id
  - lat
  - lng
  - captured_at

- posts
  - id
  - author_id
  - text
  - photo_ids
  - route_id
  - visibility
  - likes_count
  - created_at

- comments
  - id
  - post_id
  - author_id
  - text
  - created_at

- likes
  - id
  - user_id
  - target_type
  - target_id
  - created_at

## 6. Next implementation steps

1. Add Prisma or Drizzle ORM and database migration setup.
2. Add JWT auth and password-less phone/email login support.
3. Add storage integration for image uploads and object compression.
4. Parse EXIF and GPS metadata into structured photo records.
5. Add route timeline event generation from recorded locations.
6. Add community feed and map clustering queries.
7. Add tests around auth, photo upload, and route lifecycle.

## 7. Recommended stack for production

- Runtime: Node.js + TypeScript + Fastify
- Database: PostgreSQL
- ORM: Prisma
- Storage: S3-compatible object storage
- Search: Postgres full-text or Elasticsearch
- Auth: JWT + refresh tokens
- Validation: Zod
- Background jobs: BullMQ or native queue worker
