import React from 'react';
import {useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import { useState } from 'react';
import LoadingSpinner from '../../components/Loading';
import { GET_FOOD } from '../../graphql/foodQuaries';

const Food = () => {
  
  const [selectedIndex, setSelectedIndex] = useState(0);  
  const {id} = useParams();

const { loading, data } = useQuery(GET_FOOD, {
    variables: { id },
  });
 
  const food = data?.getFood;
  
  return (
    <div className='flex w-full'>
        {loading ? <LoadingSpinner/> : 
        (<div className='flex w-full flex-col items-center bg-zinc-800 h-fit sm:flex-row'>
        {/* Image Section */}
        <div className='flex w-full flex-col flex-1 '>
        {/* Main image */}
        <div className='flex w-full'>
            <img 
            src={food?.images[selectedIndex]} 
            alt={food?.name} 
            className='w-full h-[350px] object-cover '
            />
        </div>
        {/* Sub images */}
        <div className='flex py-2 border-b border-b-zinc-500 sm:border-b-0'>
            {food?.images.map((image,index)=>(
                <div key={index} className='flex cursor-pointer w-full bg-zinc-800 justify-center'>
                <img 
                src={image} 
                alt={image?.name} 
                className='w-[150px] h-[100px] border-2 border-zinc-500'
                onMouseEnter={()=>setSelectedIndex(index)}
                />
                </div>
            ))}
        </div>
        </div>
        {/* Details section */}
        <div className='flex w-full flex-col flex-1  bg-zinc-800 text-slate-200 p-4 gap-3'>
            <div className='flex text-[20px]'>
              <b className='text-yellow-500'>Name:</b>&nbsp;  
              <p>{food?.name}</p>
            </div>
            <div>
              <b  className='flex text-[20px] text-yellow-500'>Description</b>  
              <p  className='flex text-[15px]'>
                {food?.description}
              </p>
            </div>
            <div>
              <b  className='flex text-[20px] text-green-800'>Ingredients:</b>  
              <div className='flex flex-wrap gap-2'>
                {food?.ingredients.map((ingredient,index)=>(
                    <div key={index}>
                      <p className='border border-green-600 px-[4px] rounded-lg'>
                        {ingredient}
                      </p>
                    </div>
                ))}
              </div>
            </div>
            <div className='flex items-center'>
              <b  className='flex text-[20px] text-yellow-500'>Price:</b>&nbsp;  
              <p  className='text-green-500'>₹{food?.price}</p>
            </div>
            <div className='flex gap-5'>
              <div className='flex'>
                <b className='text-yellow-500'>isVege?</b>&nbsp;  
                <p>{food?.isVege === true ? 'Yes' : 'No'}</p>
              </div>
              <div className='flex'>
                <b className='text-yellow-500'>isSpicy?</b>&nbsp;  
                <p>{food?.isSpicy === true ? 'Yes' : 'No'}</p>
              </div>
            </div>
        </div>
        </div>)
        }
    </div>
  )
}

export default Food;