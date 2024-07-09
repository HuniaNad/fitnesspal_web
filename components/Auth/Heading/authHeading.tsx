import { colors } from '@/public/colors/colors';
import React from 'react'
import './authHeading.css'

type HeadingProps = {
    title: string;
    subtitle?: string;
    color?: string;
}

const Heading = ({
    title = '',
    subtitle = '',
    color = colors.purple
  }: HeadingProps) => {

  return (
    <div className="text-center">
        <h1 className="headline-primary" style={{color:color}}>{title}</h1>
        <p className="text-secondary capitalize">{subtitle}</p>
    </div>
  )
}

export default Heading
