import React from 'react'

function CardTemplate({className,onMouseEnter,onMouseLeave}) {
  return (
    <div 
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={` bg-black opacity-50 text-white flex flex-col items-center justify-center ${className}`}
    >    
    </div>
  )
}

export default CardTemplate