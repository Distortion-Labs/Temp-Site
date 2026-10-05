import { Code2, Lightbulb, Rocket } from 'lucide-react'
import Reveal from './Reveal'

const principles = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'We write code that\'s readable, maintainable, and built to last.',
  },
  {
    icon: Lightbulb,
    title: 'User First',
    description: 'Every feature starts with a real problem that needs solving.',
  },
  {
    icon: Rocket,
    title: 'Ship Fast',
    description: 'We iterate quickly and learn from real user feedback.',
  },
]

export default function Principles({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 ${className}`}>
      {principles.map((principle, index) => (
        <Reveal
          key={principle.title}
          y={15}
          delay={index * 0.1}
          duration={0.4}
          margin="0px"
          className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl glass-card"
        >
          <principle.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mb-2 sm:mb-3 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300" />
          <h4 className="font-medium text-sm sm:text-base text-white mb-1">
            {principle.title}
          </h4>
          <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
            {principle.description}
          </p>
        </Reveal>
      ))}
    </div>
  )
}
