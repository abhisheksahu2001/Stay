'use client'

import React from 'react'

interface HeadingProps { 
    title:string;
    subTile?:string;
    center?:boolean;
}

const Heading:React.FC<HeadingProps> = ({title ,subTile ,center}) => {
  return (
    <div
        className={`${center ? 'text-center' : 'text-start'}`}
    >
        <div className='text-2xl  font-bold'>
            {title}
        </div>
        <div className='font-light text-neutral-500 mt02'>
        {subTile}
        </div>
    </div>
  )
}

export default Heading