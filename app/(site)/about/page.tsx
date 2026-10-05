import { Globe, Layout, Smartphone } from 'lucide-react'
import GradientSection from '@/components/GradientSection'
import PageHero from '@/components/PageHero'
import Principles from '@/components/Principles'
import Reveal from '@/components/Reveal'
import Contact from '@/components/Contact'
import { pageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Distortion Labs is a small, focused team building browser extensions and web apps we actually want to use.',
  path: '/about',
})

const focusAreas = [
  {
    icon: Globe,
    title: 'Browser Extensions',
    description:
      'Chrome extensions that enhance your browsing experience. We build tools that integrate seamlessly with your workflow.',
    iconClass: 'text-cyan-500',
    hoverClass: 'hover:border-cyan-500/20',
  },
  {
    icon: Layout,
    title: 'Web Applications',
    description: 'Modern web apps built with React and TypeScript. Fast, accessible, and designed for real-world use.',
    iconClass: 'text-primary-500',
    hoverClass: 'hover:border-primary-500/20',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Cross-platform mobile applications. Currently in the planning phase.',
    iconClass: 'text-rose-500',
    hoverClass: 'hover:border-rose-500/20',
    comingSoon: true,
  },
]

export default function AboutPage() {
  return (
    <GradientSection>
      <PageHero
        eyebrow="About Us"
        accent="primary"
        title={
          <>
            A small team with
            <span className="text-gradient"> big ambitions</span>
          </>
        }
        description="We build tools that we actually want to use — browser extensions and apps that make everyday work on the web simpler."
      />

      <section className="section-space pt-8 sm:pt-12 md:pt-16 lg:pt-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] orb orb-cyan opacity-20 pointer-events-none animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] orb orb-purple opacity-20 pointer-events-none animate-float-slower" />

        <div className="container-main relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left content - Story */}
            <Reveal x={-20} y={0}>
              <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full" />
                  Our Story
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-white/50 leading-relaxed">
                  <p>
                    Distortion Labs started with a simple idea: build tools that we
                    actually want to use. As developers ourselves, we got tired of
                    clunky software that overcomplicates simple tasks.
                  </p>
                  <p>
                    Our first product, Multi-Finder Pro, came from a real need.
                    We wanted to search for multiple terms on a webpage without
                    opening multiple find dialogs. So we built it.
                  </p>
                  <p>
                    We&apos;re not a big company with hundreds of employees.
                    We&apos;re a small, focused team that cares deeply about
                    craft and user experience. Every product we ship is
                    something we use daily.
                  </p>
                </div>
              </div>

              <Principles />
            </Reveal>

            {/* Right - What we're building */}
            <Reveal x={20} y={0} delay={0.2}>
              <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden relative">
                {/* Gradient accent */}
                <div className="absolute -top-20 -right-20 w-40 h-40 orb orb-purple opacity-30" />

                <h2 className="font-display text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-3 relative">
                  <span className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-primary-500 rounded-full" />
                  What We Focus On
                </h2>

                <div className="space-y-6 relative">
                  {focusAreas.map((area) => (
                    <div
                      key={area.title}
                      className={`group p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] ${area.hoverClass} transition-all duration-300`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <area.icon className={`w-4 h-4 ${area.iconClass} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`} />
                        <h3 className="font-medium text-white">{area.title}</h3>
                        {area.comingSoon && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">Coming Soon</span>
                        )}
                      </div>
                      <p className="text-sm text-white/40 leading-relaxed">{area.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech we use */}
              <div className="mt-6 p-5 sm:p-6 glass-subtle rounded-xl sm:rounded-2xl">
                <p className="text-xs sm:text-sm text-white/40 mb-3">Technologies we work with</p>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-mono text-white/50 bg-white/[0.03] rounded-lg border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.1] hover:text-white/70 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Contact />
    </GradientSection>
  )
}
