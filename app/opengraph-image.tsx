import { ImageResponse } from 'next/og'
import { markPath } from '@/lib/mark'
import { siteConfig } from '@/lib/site'

const domain = new URL(siteConfig.url).host

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Fetch a static TTF instance of a Google font, subset to `text`. Returns null if unavailable. */
async function googleFont(query: string, text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${query}&text=${encodeURIComponent(text)}`)).text()
    const sources = [...css.matchAll(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/g)]
    const url = sources.at(-1)?.[1]
    if (!url) return null
    const res = await fetch(url)
    return res.ok ? await res.arrayBuffer() : null
  } catch {
    return null
  }
}

// Default social share image for every page; generated once at build time.
export default async function OpengraphImage() {
  const display = 'DistortionLens'
  const mono = `(Independent software studio)Extensions — Tools — Websites${domain}`
  const [sans, monoFont] = await Promise.all([
    googleFont('Mona+Sans:wdth,wght@112.5,600', display),
    googleFont('Geist+Mono:wght@400', mono),
  ])

  const fonts = [
    ...(sans ? [{ name: 'Mona Sans', data: sans, weight: 600 as const, style: 'normal' as const }] : []),
    ...(monoFont ? [{ name: 'Geist Mono', data: monoFont, weight: 400 as const, style: 'normal' as const }] : []),
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background: '#F1F1EE',
          color: '#111110',
          fontFamily: 'Mona Sans',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <svg width="64" height="64" viewBox="-100 -100 200 200">
            <path d={markPath} fill="#111110" />
          </svg>
          <div style={{ fontFamily: 'Geist Mono', fontSize: 22, color: '#6B6A65' }}>(Independent software studio)</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 212, fontWeight: 600, lineHeight: 0.84, letterSpacing: '-0.05em', marginLeft: -8 }}>
          <span>Distortion</span>
          <span>Lens</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1.5px solid #111110',
            paddingTop: 20,
            fontFamily: 'Geist Mono',
            fontSize: 22,
            color: '#6B6A65',
          }}
        >
          <span>Extensions — Tools — Websites</span>
          <span>{domain}</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
