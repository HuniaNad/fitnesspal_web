'use client'

import Heading from '@/components/Auth/Heading/authHeading'
import ProgressBar from '@/components/ProgressBar/progressbar'
import images from '@/public/export'
import { FormControl, MenuItem, Select } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';
import ErrorPrompt from '@/components/ErrorAlert/error'
import requireAuth from '@/config/auth'

type Disease = {
    name: string;
    associated_conditions: string[];
};

type HealthData = {
    diseases: Disease[];
    disabilities: Disease[];
};

const healthData: HealthData = {
    "diseases": [
        {
            "name": "Heart Diseases",
            "associated_conditions": ["Blocked arteries", "Weak heart", "Irregular heartbeat", "Brain attack", "High pressure", "Hardened arteries"]
        },
        {
            "name": "Kidney Problems",
            "associated_conditions": ["Weak kidneys", "Stone formation", "Urine infections", "Glomerular inflammation", "Cyst growth"]
        },
        {
            "name": "Dehydration",
            "associated_conditions": ["Heat stress", "Heat illness", "Salt-water imbalance", "Kidney shock", "Low blood volume"]
        },
        {
            "name": "Bone Weakness",
            "associated_conditions": ["Fragile bones", "Soft bones", "Child bone deformity", "Bone inflammation", "Broken bones"]
        },
        {
            "name": "Anemia",
            "associated_conditions": ["Low iron", "B12 deficiency", "Folate deficiency", "Bone marrow failure", "Blood cell breakdown"]
        },
        {
            "name": "Immune System Weakness",
            "associated_conditions": ["Virus attack", "Self-attack", "Defense loss", "Allergic reaction", "Cancer risk"]
        },
        {
            "name": "Nerve Problems",
            "associated_conditions": ["Numbness/pain", "Nerve pain", "Pinched nerves", "Paralysis risk", "Brain scarring"]
        },
        {
            "name": "Risk for Gout",
            "associated_conditions": ["Joint swelling", "Long-term gout", "Uric acid deposits", "Stone formation", "Joint damage"]
        },
        {
            "name": "High Cholesterol",
            "associated_conditions": ["Hypercholesterolemia", "Atherosclerosis", "Coronary artery disease"]
        },
        {
            "name": "Sodium Imbalance",
            "associated_conditions": ["Hyponatremia", "Hypernatremia", "Hypertension"]
        },
        {
            "name": "Calcium Disorders",
            "associated_conditions": ["Osteoporosis", "Hypocalcemia", "Hypercalcemia", "Kidney stones"]
        },
        {
            "name": "Vitamin D Deficiency",
            "associated_conditions": ["Rickets", "Osteomalacia", "Osteoporosis", "Muscle weakness"]
        },
        {
            "name": "Vitamin C Deficiency",
            "associated_conditions": ["Scurvy", "Impaired wound healing", "Increased risk of infections"]
        },
        {
            "name": "Vitamin B12 Deficiency",
            "associated_conditions": ["Pernicious anemia", "Neurological complications", "Megaloblastic anemia"]
        },
        {
            "name": "Hemoglobin Disorders",
            "associated_conditions": ["Polycythemia", "Hypoxia"]
        }
    ],
    "disabilities": [
        {
            "name": "Visual Impairment",
            "associated_conditions": ["Blindness", "Low vision", "Color blindness", "Glaucoma", "Macular degeneration"]
        },
        {
            "name": "Hearing Impairment",
            "associated_conditions": ["Deafness", "Hard of hearing", "Tinnitus", "Auditory processing disorder"]
        },
        {
            "name": "Mobility Impairment",
            "associated_conditions": ["Paralysis", "Amputation", "Spinal cord injury", "Multiple sclerosis", "Cerebral palsy"]
        },
        {
            "name": "Cognitive Impairment",
            "associated_conditions": ["Intellectual disability", "Alzheimer's disease", "Autism spectrum disorder", "Down syndrome", "Traumatic brain injury"]
        },
        {
            "name": "Speech Impairment",
            "associated_conditions": ["Apraxia", "Dysarthria", "Stuttering", "Voice disorders"]
        },
        {
            "name": "Developmental Disabilities",
            "associated_conditions": ["Attention deficit hyperactivity disorder (ADHD)", "Dyslexia", "Fetal alcohol syndrome", "Williams syndrome", "Fragile X syndrome"]
        },
        {
            "name": "Psychiatric Disabilities",
            "associated_conditions": ["Depression", "Anxiety disorders", "Bipolar disorder", "Schizophrenia", "Post-traumatic stress disorder (PTSD)"]
        },
        {
            "name": "Chronic Pain Conditions",
            "associated_conditions": ["Fibromyalgia", "Chronic fatigue syndrome", "Migraine", "Rheumatoid arthritis", "Complex regional pain syndrome"]
        },
        {
            "name": "Neurodevelopmental Disabilities",
            "associated_conditions": ["Cerebral palsy", "Autism spectrum disorder", "Intellectual disability", "Developmental delay", "Fetal alcohol syndrome"]
        }
    ]
};

const HealthInsightsPage2 = () => {
    const [diseases, setDiseases] = React.useState<string[]>([]);
    const [subDiseases, setSubDiseases] = React.useState<string[]>([]);
    const [selectedSubDiseases, setSelectedSubDiseases] = React.useState<string[]>([]);
    const [disabilities, setDisabilities] = React.useState<string[]>([]);
    const [subDisabilities, setSubDisabilities] = React.useState<string[]>([]);
    const [selectedSubDisabilities, setSelectedSubDisabilities] = React.useState<string[]>([]);
    const [error, setError] = React.useState<string>('');
    const router = useRouter();
    const healthProfileData = localStorage.getItem('healthProfileData');
    const healthProfile = healthProfileData ? JSON.parse(healthProfileData) : {};

    const handleDiseaseChange = (event: { target: { value: any } }) => { 
        const selectedDisease = event.target.value;
        
        if (Array.isArray(selectedDisease)) {
            setDiseases(selectedDisease); 

            const selectedSubDiseases = selectedDisease.map((diseaseName: string) => 
                healthData?.diseases.find((disease) => disease.name === diseaseName)?.associated_conditions || []
            ).flat();

            setSubDiseases(selectedSubDiseases);
        } else {
            setDiseases([]);
            setSubDiseases([]);
        }
    };

    const handleSubDiseaseChange = (event: { target: { value: any } }) => {
        const selectedSubDisease = event.target.value;
        
        if (Array.isArray(selectedSubDisease)) {
            setSelectedSubDiseases(selectedSubDisease);
        } else {
            setSelectedSubDiseases([]);
        }
    };

    const handleDisabilityChange = (event: { target: { value: any } }) => { 
        const selectedDisability = event.target.value;
        
        if (Array.isArray(selectedDisability)) {
            setDisabilities(selectedDisability); 

            const selectedSubDisabilities = selectedDisability.map((disabilityName: string) => 
                healthData?.disabilities.find((disability) => disability.name === disabilityName)?.associated_conditions || []
            ).flat();

            setSubDisabilities(selectedSubDisabilities);
        } else {
            setDisabilities([]);
            setSubDisabilities([]);
        }
    };

    const handleSubDisabilityChange = (event: { target: { value: any } }) => {
        const selectedSubDisability = event.target.value;
        
        if (Array.isArray(selectedSubDisability)) {
            setSelectedSubDisabilities(selectedSubDisability);
        } else {
            setSelectedSubDisabilities([]);
        }
    };

    const handleHealthData = () => {           
        if (healthProfile && diseases.length > 0 && disabilities.length > 0 && selectedSubDiseases.length > 0 && selectedSubDisabilities.length > 0) {
            const updatedHealthData = {
                ...healthProfile,
                diseases: diseases,
                subDiseases: selectedSubDiseases,
                disabilities: disabilities,
                subDisabilities: selectedSubDisabilities,
            }
            localStorage.setItem('healthProfileData', JSON.stringify(updatedHealthData));
                
            router.push('/health-insights-3');
        } else {
            setError('No health data found. Please fill health data first.');
        } 
      }

    return (
        <main>
            <div className='drinkingwater-avatar'>
                <Image src={images.drinkingwater_avatar} alt='drinking water avatar'/>
            </div>
            
            <section className="content">
                <ProgressBar step={2} />
                <Heading
                    title='health profile'
                />

                <div className="input-fields mt-5">
                    <div className="label-section mb-7">
                        <h1 className="font-bold float-left">Diseases</h1>
                        <p>Choose from a range of common and specific health conditions that may impact your fitness and wellness journey.</p>
                    </div>

                    <FormControl className='field-row'>
                        <div>
                            <label htmlFor='diseases' className="block capitalize text-sm font-medium">Disease</label>
                            <Select
                                id="diseases"
                                style={{ width: '350px', height: '40px' }}
                                className='field-border border-0 sm:text-sm sm:leading-6'
                                value={diseases}
                                onChange={handleDiseaseChange}
                                renderValue={(selected) => selected.join(', ')}
                                inputProps={{ 'aria-label': 'Without label' }}
                                multiple
                            >
                                {healthData.diseases.map((disease) => (
                                    <MenuItem key={disease.name} value={disease.name}>{disease.name}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <label htmlFor='subdiseases' className="block capitalize text-sm font-medium">Associated Conditions</label>
                            <Select
                                id="subdiseases"
                                style={{ width: '350px', height: '40px' }}
                                className='field-border border-0 sm:text-sm sm:leading-6'
                                value={selectedSubDiseases}
                                onChange={handleSubDiseaseChange}
                                renderValue={(selected) => selected.join(', ')}
                                inputProps={{ 'aria-label': 'Without label' }}
                                multiple
                            >
                                {subDiseases.map((subDisease) => (
                                    <MenuItem key={subDisease} value={subDisease}>{subDisease}</MenuItem>
                                ))}
                            </Select>
                        </div>
                    </FormControl>

                </div>

                <div className="input-fields mt-5">
                    <div className="label-section mb-7">
                        <h1 className="font-bold float-left">Disabilities</h1>
                        <p>Choose from a range of common and specific disabilities that may influence your fitness and wellness journey.</p>
                    </div>

                    <FormControl className='field-row'>
                        <div>
                            <label htmlFor='disabilities' className="block capitalize text-sm font-medium">Disability</label>
                            <Select
                                id="disabilities"
                                style={{ width: '350px', height: '40px' }}
                                className='field-border border-0 sm:text-sm sm:leading-6'
                                value={disabilities}
                                onChange={handleDisabilityChange}
                                renderValue={(selected) => selected.join(', ')}
                                inputProps={{ 'aria-label': 'Without label' }}
                                multiple
                            >
                                {healthData.disabilities.map((disability) => (
                                    <MenuItem key={disability.name} value={disability.name}>{disability.name}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <label htmlFor='subdisabilties' className="block capitalize text-sm font-medium">Associated Conditions</label>
                            <Select
                                id="subdisabilties"
                                style={{ width: '350px', height: '40px' }}
                                className='field-border border-0 sm:text-sm sm:leading-6'
                                value={selectedSubDisabilities}
                                onChange={handleSubDisabilityChange}
                                renderValue={(selected) => selected.join(', ')}
                                inputProps={{ 'aria-label': 'Without label' }}
                                multiple
                            >
                                {subDisabilities.map((subDisability) => (
                                    <MenuItem key={subDisability} value={subDisability}>{subDisability}</MenuItem>
                                ))}
                            </Select>
                        </div>
                    </FormControl>

                </div>

                <div className='w-100 flex align-middle justify-center'>
                    <button
                        onClick={() => handleHealthData()}
                        className="custom-btn auth-purple mt-2"
                    >Next</button>
                </div>
            </section>

            {error && <ErrorPrompt message={error} />}
        </main>
    )
}

export default requireAuth(HealthInsightsPage2);
