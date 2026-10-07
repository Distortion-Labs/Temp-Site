# DistortionLens

Website for [DistortionLens](https://distortionlens.com), an independent software studio (DistortionLens LLC). Built with Next.js (App Router) and deployed on Vercel.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 3 · Vercel Analytics

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                                |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start the dev server (Turbopack)            |
| `npm run build`     | Production build (includes type checking)   |
| `npm run start`     | Serve the production build                  |
| `npm run lint`      | ESLint                                      |
| `npm run typecheck` | Generate route types and run `tsc --noEmit` |

## Pages

| Route            | Description                                                                    |
| ---------------- | ------------------------------------------------------------------------------ |
| `/`              | Lens wordmark, capabilities, work index, a spread per project, studio teaser  |
| `/work`          | Index of projects                                                              |
| `/work/[slug]`   | Case study per entry in `lib/work.ts`, with a live product mockup             |
| `/studio`        | Story, principles, capabilities, and the construction of the mark             |
| `/contact`       | Contact form (or email fallback, see below)                                    |
| `/privacy`       | Privacy policy                                                                 |
| `/email-verified`| Standalone confirmation page for email verification links (not indexed)       |

`/products` and `/about` from earlier drafts redirect to `/work` and `/studio`.

## Design system

- **Palette.** Paper (`#F1F1EE`) and ink (`#111110`) with hairline rules; one dark band for the footer. The chrome is monochrome on purpose — the only saturated pixels belong to the products. Tokens live in `tailwind.config.ts`.
- **Type.** [Mona Sans](https://github.com/github/mona-sans) for everything set in sans, using its variable width axis (75–125); Geist Mono for labels and metadata. Fraunces is loaded (not preloaded) only for the sunurai.com mockup.
- **The lens.** `components/LensWordmark.tsx` sets the hero wordmark letter by letter; letters near the pointer get wider and heavier while the rest of the line compresses, so the line keeps its width. It sweeps once on load and stays static with reduced motion.
- **The mark.** `lib/mark.ts` defines the logo as twelve identical blades. Each blade pivots on its outer tip via the `--aperture` CSS variable, so the mark can open and close like a lens iris (header hover, `/studio`). Icons and the Open Graph image are drawn from the same geometry.
- **Mockups.** `components/mockups/` recreates each product's real interface in HTML/CSS from its source: a working Multi-Finder Pro (its real highlight palette, pills, counts, navigation, saved sets and settings), the Writer's Canvas workspace with its workflow phases, and a sunurai.com page with its gallery sketch.

## Editing content

- `lib/work.ts` — projects: names, status, summaries, facts, features and links. Adding a project creates its case study, index row and sitemap entry; add a matching mockup and poster in `components/mockups/`.
- `lib/site.ts` — studio name, description, email, navigation, capabilities, principles, stack.

## Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository. The Next.js preset is detected automatically; no build settings need changing.
2. Add any environment variables (below) under **Project → Settings → Environment Variables**.
3. Deploy. Every push to `main` deploys to production and every pull request gets a preview URL.

### Domains: distortionlens.com, and the old distortion-labs.com

The site lives at `distortionlens.com`. The old `distortion-labs.com` (previously on GitHub Pages) should keep working and forward to it.

1. In Vercel, open **Project → Settings → Domains** and add `distortionlens.com` and `www.distortionlens.com`. Update DNS at your registrar to the values Vercel shows.
2. Add `distortion-labs.com` and `www.distortion-labs.com` to the same project and point their DNS at Vercel too. `next.config.ts` permanently redirects every path on the old host to the same path on `distortionlens.com` (you can also set the redirect on the domain in Vercel; the two don't conflict).
3. Once the new domain verifies, disable GitHub Pages under the repository's **Settings → Pages**.
4. Update anything that links to the old domain from outside this repo — for example the Site URL and redirect URLs of any Supabase project that sends people to `/email-verified`.

Company details (brand name, legal name `DistortionLens LLC`, email, domain) live in `lib/site.ts`.

### Analytics

`@vercel/analytics` is wired into the root layout. Turn it on under **Project → Analytics** in the Vercel dashboard.

## Environment variables

See [`.env.example`](.env.example). All are optional.

| Variable               | Purpose                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata and the sitemap. Defaults to `https://distortionlens.com`.       |
| `RESEND_API_KEY`       | [Resend](https://resend.com) API key used to deliver contact form messages.                   |
| `CONTACT_FROM_EMAIL`   | Sender address, e.g. `DistortionLens <noreply@distortionlens.com>`. Its domain must be verified in Resend. |
| `CONTACT_TO_EMAIL`     | Inbox that receives messages. Defaults to `contact@distortionlens.com`.                       |

### Contact form

The form is enabled only when both `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are set; otherwise `/contact` shows an email link instead. Because the page is statically generated, redeploy after changing these variables. Submissions are validated on the server, include a topic and a honeypot field for basic bot filtering, and set the visitor's address as `reply_to` so you can answer from your inbox.

## CI

`.github/workflows/ci.yml` runs lint and a production build on pushes to `main` and on pull requests. Deployments are handled by Vercel's Git integration.
