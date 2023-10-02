import React from 'react';
import {useQuery,gql} from '@apollo/client';
import LoadingSpinner from '../../components/Loading';
import {Link, useLocation}  from 'react-router-dom';
import {AiFillEdit} from 'react-icons/ai'
import DeleteBotton from '../../components/DeleteButton';
import {useSelector} from 'react-redux';
import AddToWishListBtn from '../../components/AddToWishListBtn';


const Foods = () => {
    
    const location = useLocation();
    const {results} = useSelector((state)=> state.liveSearch)
    const {loading} = useQuery(GET_FOODS);
 
    const { pathname } = location;

    const shortenText = (text, n)=>{
      if(text.length>n){
         const shortenedText = text.substring(text,n).concat('...');
         return shortenedText;
      }
    };

  return (
    <div className={pathname ==='/dashboard'? 'flex flex-wrap gap-2 p-4 w-full' : 'flex w-full flex-wrap gap-4 p-4 z-20'}>
       {loading ? <LoadingSpinner/> : 
       (
        <div className='flex w-full flex-wrap gap-4 p-4 justify-center h-fit'>
        {results?.map((food, index)=>(
            <div key={index} className={pathname === '/dashboard' ? 'border w-fit h-fit rounded-lg overflow-hidden':
            'flex w-full flex-col sm:flex-row  overflow-hidden shadow-md'}>
              
                {/* Image section */}
                <div className='flex w-full flex-col relative'>
                  <Link to={`/food/${food.id}`} className={pathname === '/dashboard' ? 'flex flex-col': 'flex w-full'}>
                    <img 
                    src={food?.images[0]} 
                    alt={`${index} +1`} 
                    className={pathname === '/dashboard' ? 'w-[200px] h-[120px]' : 
                    'min-w-full h-[300px] object-cover'}
                    />
                  </Link>
                  {/* Edit and delete buttons */}
                  {pathname === '/dashboard' && 
                  <div className='flex w-full justify-between p-1 bg-black bg-opacity-80'>
                      <Link to={`/dashboard/edit-food/${food.id}`}>
                        <AiFillEdit className='text-slate-200 text-[18px] cursor-pointer'/>
                      </Link>
                      <DeleteBotton id={food.id}/>
                  </div>
                  }
                  <AddToWishListBtn
                  className='text-[30px] text-slate-300 absolute top-1 right-1 cursor-pointer'
                  food={food}
                  />
                </div>
               {/* Food properties sction */}
               <div className={pathname === '/dashboard' ? 'p-2':
               'flex flex-col w-full sm:w-[80%] bg-black bg-opacity-100 text-white p-4 gap-2 justify-center'
                }
               >
                   <h1 className={pathname === '/dashboard' ? '' :
                   'text-3xl font-serif text-yellow-500'}>
                    {food?.name}
                   </h1>
                   {pathname !== '/dashboard' && <p className='text-slate-200'>{shortenText(food?.description, 300)}</p>}
                   <p className={pathname === '/dashboard' ? '' : 'text-xl'}>
                    only at ₹<b className={pathname === '/dashboard' ? '' :'text-green-700'}>{food?.price}</b>
                   </p>
               </div>
            </div>
        ))}
       </div>
       )
       }
    </div>
  )
}

export default Foods;


const GET_FOODS = gql`
  query GetFoods {
    getFoods {
      id
      name
      images
      price
      description
    }
  }
`;