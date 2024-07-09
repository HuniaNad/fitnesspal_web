import React from 'react'

interface HeadingProps {
    title: string;
    subtitle: string;
}

const Heading = ({title, subtitle}: HeadingProps) => {
  return (
    <div className='text-center'>
        <h1 className="headline-primary">{title}</h1>
        <h1 className="headline-secondary">{subtitle}</h1>
    </div>
  )
}

Heading.defaultProps = {
    title: '',
    subtitle: ''
}

export default Heading
