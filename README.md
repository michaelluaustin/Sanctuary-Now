# Sanctuary Now

A bilingual (English / 中文) web app for guided personal worship. Pick a topic and it generates a session with Bible verses, reflections, worship songs (embedded from YouTube), a concluding reflection, and a closing prayer.

## Features

- **10 curated topics**, e.g. Overcoming Anxiety, Forgiveness and Grace, Walking in Faith
- **AI-generated sessions** built with [Genkit](https://firebase.google.com/docs/genkit) and OpenAI GPT-4, using structured (schema-validated) output
- **Chinese song matching**: for Chinese sessions, songs come from a curated set of 42 Chinese worship songs, ranked by embedding similarity to the topic, so every YouTube link is real
- **Favorites** saved in the browser (localStorage), with no account needed

## Getting started

Requires Node.js 20+ and an OpenAI API key.

```bash
npm install
cp .env.example .env   # then add your OPENAI_API_KEY
npm run dev            # http://localhost:9002
```

Other scripts:

| Command | Purpose |
| --- | --- |
| `npm run build` / `npm start` | Production build and serve |
| `npm run typecheck` | TypeScript check |
| `npm run genkit:dev` | Genkit developer UI for inspecting prompts |

## Project structure

```
src/
  app/                    Pages: home (topic picker), /session, /favorites
  ai/genkit.ts            Genkit + OpenAI configuration
  ai/flows/               Worship session generation (server action)
  lib/topics.ts           Topic list (English + Chinese)
  lib/song-similarity.ts  Embedding search over Chinese worship songs
  components/             Session display, YouTube embed, shadcn/ui components
public/
  chinese_worship_embeddings.json   Song titles, YouTube URLs, and embeddings
docs/blueprint.md         Original product and design spec
```

## Deployment

Configured for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) via `apphosting.yaml`. Set `OPENAI_API_KEY` as a secret in the hosting environment.
