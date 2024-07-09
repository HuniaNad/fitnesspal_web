import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';

const ProgressBar = ({ step }: { step: number }) => {
  return (
    <section className='progress-container '>
        <div style={{ color: (step === 1 || step === 2 || step === 3 ? 'black' : '#d1d1d1') }}>
            <AdjustIcon className='progress-icon' fontSize='large' />
        </div>
        <div 
            className="horizontal-divider"
            style={{ color: (step === 2 || step === 3 ? 'black' : '#d1d1d1') }}
        >
            <span style={{ borderColor: (step === 2 || step === 3 ? 'black' : '#d1d1d1') }} ></span>
            <AdjustIcon className='progress-icon' fontSize='large' />
            
        </div>
        <div 
            className="horizontal-divider"
            style={{ color: (step === 3 ? 'black' : '#d1d1d1') }}
        >
            <span style={{ borderColor: (step === 3 ? 'black' : '#d1d1d1') }} ></span>
            <AdjustIcon className='progress-icon' fontSize='large' />
            
        </div>
        

      
    </section>
  )
}

export default ProgressBar;
