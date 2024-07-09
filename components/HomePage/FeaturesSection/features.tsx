import Image from 'next/image';
import images from '@/public/export';
import React from 'react';
import Heading from '../Heading/heading';

const FeatureCard = ({ img, title, description }: { img: string, title: string, description: string }) => {
    return (
        <div className="feature">
            <div className="feature-img">
                <Image src={img} alt={title} />
            </div>
            <h2 className="text-lg font-bold mt-4">{title}</h2>
            <p className="text-sm px-2 text-secondary">{description}</p>
        </div>
    )
};

const Features = () => {
  return (
    <div id='features' className='section-layout'>
        <Heading title="features we provide" subtitle="enhanced functionality tailored for you" />

        <div className="feature-gallery">
            <FeatureCard 
                img={images.personalized_meal} 
                title="Personalized Meal Plans" 
                description="Tailored to your dietary preferences & health goals" 
            />
            <FeatureCard 
                img={images.guided_workouts} 
                title="Guided Workout Routines" 
                description="Professionally curated workouts designed to maximize results" 
            />
            <FeatureCard 
                img={images.progress_tracking} 
                title="Progress Tracking" 
                description="Easily monitor your progress and stay motivated" 
            />
            <FeatureCard 
                img={images.expert_training} 
                title="Expert Guidance" 
                description="Access expert tips and advice to optimize your health journey" 
            />  
        </div>
      
    </div>
  )
}

export default Features
