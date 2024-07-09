import Image from "next/image";

import images from '@/public/export';
import Link from "next/link";

const Hero = () => {
  return (
    <section id="home" className="hero-container">
      <div className="hero-text">
        <h1 className="text-4xl font-bold headline-primary">An Ultimate Destination</h1>
        <h1 className="text-4xl font-bold headline-secondary">for your health and wellness needs.</h1>
        <p className="mt-4 text-xl text-secondary">Achieve Your Fitness Goals with Personalized Plans and Expert Guidance.</p>
        
        <div className="space"></div>
        <Link href='/login'>
          <button className="custom-btn gradient-button-purple">Get Started Now</button>
        </Link>
      </div>

      <div className="hero-img">
        <Image src={images.hero} alt="Hero Image" />
      </div>
      
    </section>
  )
}

export default Hero
