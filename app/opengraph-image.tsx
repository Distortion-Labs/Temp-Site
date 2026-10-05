import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site'

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Default social share image for every page; generated once at build time.
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'app/icon.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          color: 'white',
          backgroundColor: '#050208',
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 15% 0%, rgba(120, 80, 255, 0.45), transparent), radial-gradient(ellipse 60% 60% at 95% 100%, rgba(6, 182, 212, 0.3), transparent), radial-gradient(ellipse 50% 40% at 70% 30%, rgba(244, 63, 94, 0.18), transparent)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <img src={logoSrc} width={72} height={72} alt="" style={{ borderRadius: 16 }} />
          <div style={{ display: 'flex', fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>
            Distortion<span style={{ color: '#c084fc' }}>Labs</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Software that
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              backgroundImage: 'linear-gradient(135deg, #c084fc 0%, #22d3ee 55%, #fb7185 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            bends reality
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: 'rgba(255, 255, 255, 0.6)', maxWidth: 900 }}>
            Browser extensions and apps that transform how you interact with the web.
          </div>
        </div>
      </div>
    ),
    size
  )
}
