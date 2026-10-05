export type ProjectSlug = 'multi-finder-pro' | 'writers-canvas' | 'sunurai'

export interface Project {
  slug: ProjectSlug
  index: string
  name: string
  kind: string
  status: string
  /** One line for lists and metadata. */
  summary: string
  description: string
  facts: { label: string; value: string }[]
  features: { title: string; body: string }[]
  link?: { label: string; href: string }
}

export const projects: Project[] = [
  {
    slug: 'multi-finder-pro',
    index: '01',
    name: 'Multi-Finder Pro',
    kind: 'Chrome extension',
    status: 'Live',
    summary: 'Find and highlight every word you are looking for, on any page, at once.',
    description:
      "Chrome's find bar looks for one thing at a time. Multi-Finder Pro takes a whole set of keywords, gives each its own color, and keeps a live count and next/previous controls for every one of them — so a long contract, paper or log reads like it's already been marked up.",
    facts: [
      { label: 'Platform', value: 'Chrome, Manifest V3' },
      { label: 'Shortcut', value: '⌘⇧F  /  Ctrl+Shift+F' },
      { label: 'Built with', value: 'JavaScript, Vite, Supabase, Stripe' },
      { label: 'Status', value: 'Available on the Chrome Web Store' },
    ],
    features: [
      {
        title: 'Keyword pills',
        body: 'Type a word and press comma — it becomes a colored pill. Search runs as you type, no Enter needed.',
      },
      {
        title: 'A color per term',
        body: 'Eight tuned highlight colors, fresh ones after that, and a picker for any keyword you want to own.',
      },
      {
        title: 'Every match, navigable',
        body: 'Previous and next for each keyword, a position counter, and markers down the scrollbar.',
      },
      {
        title: 'Partial or exact',
        body: 'Match inside words, or switch to whole words only when “cat” shouldn’t find “category”.',
      },
      {
        title: 'Library & saved sets',
        body: 'Keep the keywords you reuse, group them into sets, then pin, tag and reload them in one click.',
      },
      {
        title: 'Fits the page',
        body: 'Marker, pill or underline highlights, in an overlay that picks light or dark to match the site.',
      },
      {
        title: 'Import & export',
        body: 'Move your library as JSON — merge it with what you have, or replace it outright.',
      },
      {
        title: 'Accounts & sync',
        body: 'Sign in with email, Google or GitHub to carry your keyword sets between machines.',
      },
    ],
    link: {
      label: 'Add to Chrome',
      href: 'https://chromewebstore.google.com/detail/knidmcbnbpankccookfallalhkoepibi',
    },
  },
  {
    slug: 'writers-canvas',
    index: '02',
    name: "Writer's Canvas",
    kind: 'Writing studio',
    status: 'In development',
    summary: 'The creative studio for webtoon, manga and light novel creators.',
    description:
      "Serialized stories have more moving parts than a word processor was built for. Writer's Canvas keeps the whole series together — chapters and panel scripts, characters and world, timelines, storyboards and the production pipeline — and arranges its tools around the phase of work you're in.",
    facts: [
      { label: 'For', value: 'Webtoon, manga, web & light novels, comics' },
      { label: 'Platform', value: 'Web app, installable, works offline' },
      { label: 'Built with', value: 'Next.js, React, Supabase, TipTap' },
      { label: 'Status', value: 'In development' },
    ],
    features: [
      {
        title: 'Workflow phases',
        body: 'Worldbuilding, Outlining, Drafting, Production, Review. Each phase brings forward the tools that matter now.',
      },
      {
        title: 'A proper manuscript editor',
        body: 'Slash commands, focus mode, split view, and version history: twenty today, one a day for ten days, named snapshots forever.',
      },
      {
        title: 'Panel scripts & storyboards',
        body: 'Shot types, transitions, speech, thought and narration, an SFX library, and storyboards that read left-to-right or right-to-left.',
      },
      {
        title: 'Characters, places, lore',
        body: 'Deep character profiles, relationship maps and arc tracking, an interactive world map and a story timeline.',
      },
      {
        title: 'AI Insights',
        body: 'Feedback, not ghostwriting: style, pacing, continuity and voice-consistency analysis of what you have already written.',
      },
      {
        title: 'Production pipeline',
        body: 'Script, thumbnail, sketch, line, color, letter, QA, published — tracked per chapter, with a release schedule.',
      },
      {
        title: 'Local spell check',
        body: 'Spelling and grammar run in the browser via WebAssembly, and learn your character and place names.',
      },
      {
        title: 'Offline first',
        body: 'Keep writing without a connection; changes sync when you are back online.',
      },
    ],
  },
  {
    slug: 'sunurai',
    index: '03',
    name: 'sunurai.com',
    kind: 'Artist site & store',
    status: 'In progress',
    summary: 'Portfolio, print shop and a walk-through 3D gallery for the painter Sunu Rai.',
    description:
      'An editorial catalogue of paintings at honest proportions, a print store, and a gallery you can walk through where every piece hangs at its true size. The visible layer is a grid, big images and almost no chrome. The engineering sits underneath.',
    facts: [
      { label: 'Type', value: 'Website, store & studio admin' },
      { label: 'Built with', value: 'Next.js, three.js, Supabase, Stripe, Resend' },
      { label: 'Status', value: 'In progress' },
    ],
    features: [
      {
        title: 'A gallery you can walk',
        body: 'A twenty-six-metre white-cube room in the browser. Every painting hangs at true size under its own track light.',
      },
      {
        title: 'Prints sized from the painting',
        body: 'Print products are derived from each work’s proportions, and every line is re-priced on the server.',
      },
      {
        title: 'Deep zoom, no watermark',
        body: 'Look closely: tiles are cut on demand from private high-resolution masters instead of stamping the image.',
      },
      {
        title: 'Originals verified by NFC',
        body: 'Each original carries a tag. Tap it with a phone and the site confirms the piece is genuine.',
      },
      {
        title: 'A studio behind the site',
        body: 'A passkey-only admin for works, orders, commissions and the mailing list — with its own analytics.',
      },
      {
        title: 'Commissions & mail',
        body: 'Commission threads with email replies, and a double opt-in list with campaigns written in plain text.',
      },
    ],
    link: { label: 'sunurai.com', href: 'https://sunurai.com' },
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
