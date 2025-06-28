import { BackgroundBeams } from '@/components/ui/Background'
import React from 'react'

const layout = ({ children }) => {
  return (
    <div className='w-full flex justify-center items-center'>
      <BackgroundBeams />
      {children}
    </div>
  )
}

export default layout
