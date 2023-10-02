import React from 'react'

const LoadingSpinner = () => {
 return (
   <div className='flex w-full h-screen items-center justify-center bg-zinc-800'>
     <div className="animate-spin rounded-full border-t-4 border-b-8 border-amber-500 border-opacity-80 h-52 w-52"></div>
   </div>
 );
};

export default LoadingSpinner