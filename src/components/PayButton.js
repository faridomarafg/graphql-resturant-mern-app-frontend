import React, { useState } from 'react'
import {useMutation} from '@apollo/client';
import {useSelector} from 'react-redux';
import { CREATE_CHEKOUT_SESSION } from '../graphql/checkoutQueries';

const initialState = {
  userId:"",
  userName:"",
  email:"",
  city:"",
  postalCode:"",
  phone:"",
  full_address:"",
}

const PayButton = ({cartItems}) => {
  const {user} = useSelector((state)=> state.auth);
  const [formData, setFormData] = useState({...initialState, userId: user?.id,});

  const {userId, userName, email, city, postalCode, phone, full_address} = formData;

  const [createCheckoutSesstion] = useMutation(CREATE_CHEKOUT_SESSION);

  const onChangeHandler = (e)=>{
     const {name, value} = e.target;
     setFormData({...formData, [name]: value});
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    try {
      const foodItem = cartItems.map((item) => ({
        id:item.id,
        name: item.name,
        price: item.price * 100,
        cartQuantity: item.cartQuantity,
        images: item.images[0]
      }));

      const { data } = await createCheckoutSesstion({
        variables: {
          cartItems: foodItem,
          userDetailsInput:formData
        },
      });

      window.location.href = data.createCheckoutSesstion.url;

    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className='flex w-full items-center justify-center'>
      <form
      onSubmit={handleCheckout}
      className='flex flex-col w-full gap-3 items-center'
      >
        <input 
        type="text" 
        name="userName" 
        value={userName}
        onChange={onChangeHandler}
        placeholder='Name'
        className='w-full px-2 outline-none border-[2px] border-zinc-600'
        />
        <input 
        type="email" 
        name="email" 
        value={email}
        onChange={onChangeHandler}
        placeholder='Email'
        className='w-full px-2 outline-none border-[2px] border-zinc-600'
        />
        <input 
        type="text" 
        name="city" 
        value={city}
        onChange={onChangeHandler}
        placeholder='City'
        className='w-full px-2 outline-none border-[2px] border-zinc-600'
        />
        <input 
        type="text" 
        name="full_address" 
        value={full_address}
        onChange={onChangeHandler}
        placeholder='Full_address'
        className='w-full px-2 outline-none border-[2px] border-zinc-600'
        />
        <div className='flex flex-row w-full gap-2'>
          <input 
          type="text" 
          name="phone" 
          value={phone}
          onChange={onChangeHandler}
          placeholder='Phone'
          className='w-full px-2 outline-none border-[2px] border-zinc-600'
          />
          <input 
          type="text" 
          name="postalCode" 
          value={postalCode}
          onChange={onChangeHandler}
          placeholder='Postal code'
          className='w-full px-2 outline-none border-[2px] border-zinc-600'
        />
        </div>
        <input 
        type="text" 
        name="userId" 
        value={userId}
        hidden
        onChange={onChangeHandler}
        placeholder='UserId'
        className='w-full px-2 outline-none border-[2px] border-zinc-600'
        />
        <button 
        disabled={!user}
        type='submit'
        className={!user ? 'w-full py-1 h-fit px-5 text-white bg-yellow-500 cursor-not-allowed' : 
        'w-full py-1 h-fit px-5 text-white bg-yellow-500'}
        >
          Continue to payment
       </button>
       {!user &&<p className='text-slate-500 font-mono text-sm font-semibold'>Please login to continue the payment process</p>}
      </form>
      
    </div>
  )
}

export default PayButton