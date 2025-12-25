import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-gray-700'>{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
      <p className='h-[1px] sm:h-0.5 w-8 sm:w-12 bg-gray-700'></p>
    </div>
  )
}

export default Title
