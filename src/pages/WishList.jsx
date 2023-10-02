import {useSelector, useDispatch} from 'react-redux'
import { addToCart, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, clearCart, decreaseCartItem, removeItemFromCart } from '../features/wishListSlice';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { useEffect } from 'react';
import PayButton from '../components/PayButton';


const WishList = () => {
    const dispatch = useDispatch();
    const {cartItems, cartTotalAmount} = useSelector((state)=> state.wishList);

    useEffect(()=>{
      dispatch(CALCULATE_SUBTOTAL());
      dispatch(CALCULATE_TOTAL_QUANTITY());
    },[dispatch, cartItems]);

    const increacseCartQuantity = (item)=>{
       dispatch(addToCart(item));
    };

    const decreacseCartQuantity = (item)=>{
      dispatch(decreaseCartItem(item));
   };

   const removeItem = (item)=>{
     dispatch(removeItemFromCart(item));
   };

   const clearCartItems = ()=>{
     dispatch(clearCart());
   };

  return (
    <div className='flex flex-col w-full p-4 gap-3'>
       {cartItems?.length === 0 ? 
       (<div className='flex w-full h-screen items-center justify-center'>
          <h1 className='text-3xl sm:text-5xl text-zinc-700 font-semibold font-mono'>
            Wish list is empty!
          </h1>
       </div>) 
       : 
       (<div className='flex flex-col w-full p-4 gap-3'>
       {/* title section */}
       <div className='flex w-full justify-center'>
          <h1 className='text-3xl font-mono font-bold text-zinc-700'>Wishlist</h1>
       </div>
       <div className='flex flex-col sm:flex-row w-full gap-4'>
          {/* left section */}
          <div className='flex flex-col gap-2 w-full'>
            {cartItems.map((item, index)=>(
              <div 
              key={index}
              className='border p-2 rounded-lg shadow-sm'
              >
                <div className='flex gap-5'>
                  <img 
                  src={item?.images[0]} 
                  alt={item?.name} 
                  className='w-[150px] h-[100px]'
                  />
                  <div className='flex w-full flex-col justify-center  relative'>
                    <p className='text-zinc-700 font-semibold'>{item?.name}</p>
                    <b className='text-green-700'>₹{item?.price}</b>
                    <div className='flex gap-2'>
                      <button 
                      onClick={()=> decreacseCartQuantity(item)}
                      className='border border-zinc-700 rounded-lg px-[9px] py-[0px]'
                      >
                        -
                      </button>
                        <b>{item?.cartQuantity}</b>  
                        <button 
                          onClick={()=> increacseCartQuantity(item)} 
                          className='border border-zinc-700 rounded-lg px-[9px] py-[0px]'
                          >
                            +
                        </button>
                    </div>
                    <AiOutlineCloseCircle 
                    onClick={()=> removeItem(item)}
                    className='text-[25px] absolute top-1 right-1 cursor-pointer'
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* Clear cart and cartTotalAmount */}
            <div className='flex w-full justify-between px-2'>
              <button onClick={clearCartItems} className='border-x border-x-zinc-500 border-y-2 border-y-zinc-700 px-5 rounded-lg'>
                Clear Cart
              </button>
              <b className='text-green-700 font-mono'>₹{cartTotalAmount}</b>
            </div>
          </div>
          {/* right section */}
          <div className='flex w-full'>
            <PayButton cartItems={cartItems}/>
          </div>  
       </div>
       </div>)
       }
    </div>
  )
}

export default WishList