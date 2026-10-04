import Reveal from './Reveal'

export default function PipelineTeaser() {
  return (
    <Reveal delay={0.3} margin="0px" className="mt-8 sm:mt-12 max-w-4xl mx-auto">
      <div className="glass-subtle rounded-2xl p-6 sm:p-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
          In Development
        </div>
        <h4 className="font-display text-lg sm:text-xl font-semibold text-white mb-2">
          More tools in the pipeline
        </h4>
        <p className="text-sm sm:text-base text-white/40 max-w-md mx-auto">
          We&apos;re working on new productivity extensions — tab management,
          smart bookmarks, and more. Follow us on GitHub for updates.
        </p>
      </div>
    </Reveal>
  )
}
