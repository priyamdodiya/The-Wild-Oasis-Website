import React from 'react'
import Spinner from '../_components/Spinner';

const loading = () => {
  return (
    <div className='grid items-center justify-center'>
      <Spinner />
      <p className='text-xl'>Loading cabin data...</p>
    </div>
  )
}

export default loading;