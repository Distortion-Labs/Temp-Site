import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Features />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
