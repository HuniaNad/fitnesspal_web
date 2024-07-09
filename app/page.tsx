import BMISection from '@/components/HomePage/BMISection/bmi'
import Features from '@/components/HomePage/FeaturesSection/features'
import Footer from '@/components/HomePage/Footer/footer'
import Hero from '@/components/HomePage/HeroSection/hero'
import Navbar from '@/components/HomePage/Navbar/navbar'
import Subscription from '@/components/HomePage/SubscriptionSection/subscription'

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-between">
      <Navbar />
      <Hero />
      <BMISection />
      <Features />
      <Subscription />
      <Footer />
    </section>
  )
}
