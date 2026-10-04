import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Principles from './Principles'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

/** Home page about teaser; the full story lives on /about. */
export default function About() {
  return (
    <section id="about" className="section-space relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] orb orb-cyan opacity-20 pointer-events-none animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] orb orb-purple opacity-20 pointer-events-none animate-float-slower" />

      <div className="container-main relative">
        <Reveal className="mb-10 sm:mb-12">
          <SectionHeading
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
        </Reveal>

        <div className="max-w-4xl mx-auto">
          <Principles />

          <Reveal y={10} margin="0px" className="mt-8 sm:mt-10 text-center">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 btn-glass px-6 py-3 text-sm sm:text-base font-medium text-white/80 rounded-xl"
            >
              Read our story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
