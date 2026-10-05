import SectionHeading from './SectionHeading'

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  accent?: 'cyan' | 'primary'
}

/** Top-of-page heading for inner pages. Animates with CSS so it is visible before hydration. */
export default function PageHero({ eyebrow, title, description, accent }: PageHeroProps) {
  return (
    <section className="relative pt-32 sm:pt-40 pb-4 sm:pb-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] orb orb-purple opacity-20 pointer-events-none" />
      <div className="container-main relative animate-fade-in-up">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} accent={accent} />
      </div>
    </section>
  )
}
