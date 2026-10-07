import ApertureStudy from '@/components/ApertureStudy'
import PageIntro from '@/components/PageIntro'
import SectionHeader from '@/components/SectionHeader'
import { pageMetadata } from '@/lib/metadata'
import { capabilities, principles, stack } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Studio',
  description:
    'DistortionLens is a small, independent software studio. We make our own products and build websites for a small number of clients.',
  path: '/studio',
})

export default function StudioPage() {
  return (
    <>
      <PageIntro label="Studio" title="Small software, carefully made.">
        DistortionLens is an independent software studio. We make our own products — browser extensions and creative
        tools — and build websites for a small number of clients.
      </PageIntro>

      {/* Story */}
      <section aria-labelledby="story-title" className="container-site py-24 sm:py-32">
        <div className="grid gap-y-6 sm:grid-cols-12 sm:gap-x-6">
          <h2 id="story-title" className="label text-muted sm:col-span-3 sm:pt-1.5">
            (01) Story
          </h2>
          <div className="space-y-6 text-lead text-pretty sm:col-span-9 lg:col-span-7">
            <p>
              DistortionLens started with a simple idea: build the tools we actually want to use. We were tired of
              software that makes simple things complicated.
            </p>
            <p className="text-muted">
              Our first product, Multi-Finder Pro, came from a real need — searching a page for several things at once
              without juggling find dialogs. So we built it, and we still use it every day. Writer&apos;s Canvas follows
              the same instinct, for people writing serialized stories.
            </p>
            <p className="text-muted">
              We&apos;re not a big company, and we don&apos;t want to be. We&apos;re a small, focused studio that cares about
              craft, and everything we ship is something we would use ourselves.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" className="container-site border-t border-line py-24 sm:py-32">
        <SectionHeader id="principles-title" index="02" label="Principles" title="How we work." />
        <ol className="mt-14 border-t border-ink sm:mt-20">
          {principles.map((item, i) => (
            <li key={item.title} className="grid gap-3 border-b border-line py-8 sm:grid-cols-12 sm:gap-6">
              <span className="label text-muted sm:col-span-3">0{i + 1}</span>
              <h3 className="text-heading font-medium sm:col-span-5">{item.title}</h3>
              <p className="text-small text-muted text-pretty sm:col-span-4">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="capabilities-title" className="container-site border-t border-line py-24 sm:py-32">
        <SectionHeader id="capabilities-title" index="03" label="Capabilities" title="What we build." />
        <div className="mt-14 grid gap-x-6 gap-y-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, i) => (
            <div key={item.title} className="border-t border-ink pt-5">
              <p className="label text-muted">0{i + 1}</p>
              <h3 className="mt-6 text-[1.25rem] font-medium tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 text-small text-muted text-pretty">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-y-4 sm:grid-cols-12 sm:gap-x-6">
          <p className="label text-muted sm:col-span-3">Tools we reach for</p>
          <ul className="flex flex-wrap gap-2 sm:col-span-9">
            {stack.map((tool) => (
              <li key={tool} className="label rounded-full border border-line-strong px-3 py-1.5">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The mark */}
      <section aria-labelledby="mark-title" className="container-site border-t border-line py-24 sm:py-32">
        <SectionHeader id="mark-title" index="04" label="The mark" title="Twelve blades, one aperture." />
        <div className="mt-14 grid gap-y-10 sm:mt-20 sm:grid-cols-12 sm:gap-x-6">
          <div className="space-y-4 text-small text-muted text-pretty sm:col-span-3">
            <p>
              The mark began as a glass render: twelve shards turning around an opening, like the iris of a lens.
            </p>
            <p>
              We redrew it as twelve identical blades. Each one&apos;s trailing edge runs parallel to the next one&apos;s
              leading edge, so every gap is the same width — and each blade pivots on its outer tip, so the mark can
              open and stop down like the real thing.
            </p>
          </div>
          <div className="sm:col-span-9">
            <ApertureStudy />
          </div>
        </div>
      </section>
    </>
  )
}
