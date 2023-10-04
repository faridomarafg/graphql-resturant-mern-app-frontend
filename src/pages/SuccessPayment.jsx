// import React from 'react'

// const SuccessPayment = () => {
//   return (
//     <div>SuccessPayment</div>
//   )
// }

// export default SuccessPayment

import React from 'react'
import { Link } from 'react-router-dom'

const SuccessPayment = () => {
  return (
    <div className='flex flex-col gap-4 w-full h-screen items-center justify-center'>
        <h1 className='text-4xl text-green-600 font-mono font-semibold'>Success full payment!</h1>
        <Link to='/' className='text-3xl text-amber-400 font-mono font-bold' >Back to Home page</Link>
    </div>
  )
}

export default SuccessPayment