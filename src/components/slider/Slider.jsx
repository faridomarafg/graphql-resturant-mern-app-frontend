import { useEffect } from 'react';
import { useState } from 'react';
import {BiRightArrowCircle,BiLeftArrowCircle} from 'react-icons/bi';
import LineGrade from '../LineGrade';
import CardTemplate from './CardTemplate';
import {sliderData} from './slider-data';


function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);
   const [isPaused, setIsPaused] = useState(false);

   const slideLength = sliderData.length;

   let slideInterval;
   
   //it's used for right arrow-key of slider
   const nextSlide = ()=> setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide+1);
   
   //it's used for left arrow-key of slider
   const prevSlide = ()=> setCurrentSlide(currentSlide === 0  ? slideLength -1: currentSlide-1);

   const autoSlide = ()=>{//it's used for auto-slidding
       slideInterval = setInterval(() => {
         nextSlide()
       }, 5000);
   }

   useEffect(()=>{//it's used to active auto-slider
      if(!isPaused){
       autoSlide()
       return ()=> clearInterval(slideInterval)
      } 
      // eslint-disable-next-line 
   },[autoSlide]);

   const handleMouseEnter = () => {//disable auto-slider when mouse hover on slider text
       setIsPaused(true);
     };
   
     const handleMouseLeave = () => {//enable auto-slider again when mouse leave
       setIsPaused(false);
     };

    return (
        <div className='w-full  flex flex-col relative z-0'>
            {sliderData.map((slide, index)=>(
           <div 
           key={index} 
           className='flex flex-col w-full items-center justify-center'
           >
              {index === currentSlide && (
                    <div className='w-full flex flex-col items-center justify-center relative'>
                    {/* Slider Image  */}
                    <div className='flex w-full h-[200px] sm:h-[400px] md:h-[500px]'>
                        <img 
                        className='w-full h-full object-cover '
                        src={slide.image} 
                        alt="slideImage"
                        />
                    </div>
                    <div className='absolute w-full flex flex-col items-center justify-center'>
                    {/* Card Template */}
                    <CardTemplate
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className= ' w-[50%] h-[120px] sm:h-[150px] md:h-[200px] hover:opacity-70 duration-700 shadow-lg shadow-white cursor-pointer'
                    />
                    {/* Card Text */}
                    <div className='flex flex-col items-center justify-center absolute w-full'>
                    <div className='flex flex-col items-center text-white w-full'>
                        <h1 className=' md:text-4xl w-[50%] text-center'>{slide.heading}</h1>
                        <p className='text-sm w-[50%]  text-center'>{slide.desc}</p>
                    </div>
                    {/* Line Grid */}
                    <LineGrade className=' bg-white h-0.5 w-[36%] my-1 md:my-4'/>
                    </div>

                    {/* Arrow key  */}
                    <div className='absolute w-full flex justify-between px-5  z-40'>
                        <BiLeftArrowCircle onClick={prevSlide } className='text-2xl md:text-4xl cursor-pointer hover:bg-teal-500 bg-white rounded-full text-slate-500 shadow-sm shadow-white hover:scale-110 duration-700'/>
                        <BiRightArrowCircle onClick={nextSlide} className='text-2xl md:text-4xl cursor-pointer hover:bg-teal-500 bg-white rounded-full text-slate-500 shadow-sm shadow-white hover:scale-110 duration-700' />
                    </div>

                    </div>
                        
                    </div>
                    )}
                </div>
            ))}
        </div>
    )
    };

export default Slider