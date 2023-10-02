import React from 'react';
import {useQuery} from '@apollo/client';
import { GET_ORDER } from '../graphql/orderQueries';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/Loading';


const OrderDetails = () => {
    const {id} = useParams()
    const {loading,data} = useQuery(GET_ORDER,{
        variables:{
            id
        }
    });

    const order = data?.getOrder;

  return (
    <div className='flex w-full min-h-screen p-4'>
        {
        loading ? <LoadingSpinner/> : 
        <div className='flex flex-col sm:flex-row w-full gap-2 p-4 border-2 border-zinc-500 h-fit'>
            {/* ORDER DETAILS */}
           <div className='flex flex-col w-full p-4 bg-slate-100 h-fit rounded-lg'>
             <h1 className='w-full text-center font-bold text-xl py-2'>ORDER DETAILS</h1>
               <div className='flex flex-col w-full'>
                <div className='flex flex-col w-full'>
                    {order?.line_items.map((item,index)=>(
                        <div key={index} className='flex flex-row w-full border-y-2 border-y-slate-300 shadow-sm items-center'>
                            {/* Image section */}
                            <div className='flex'>
                            <img 
                            src={item?.images[0]} 
                            alt={item.name} 
                            className='w-[150px] h-[90px] object-contain'
                            />
                            </div>
                            {/* Item details section */}
                            <div className='flex flex-col px-2'>
                                <div className='flex items-center gap-1 font-semibold text-slate-700'>
                                    <h1 className='text-[20px]'>Name:</h1>
                                    <p className='text-[20px]'>{item?.name}</p>
                                </div>
                                <div className='flex items-center gap-1 font-semibold text-slate-500'>
                                    <h1 className='text-[20px]'>Item Quantity:</h1>
                                    <b className='text-[20px] text-orange-500'>{item?.cartQuantity}</b>
                                </div>
                                <div className='flex items-center gap-1 font-semibold text-slate-500'>
                                    <h1 className='text-[20px]'>Price:</h1>
                                    <p className='text-[20px] text-green-600'>₹{item?.price / 100}</p>
                                </div>
                                <div className='flex items-center gap-1 font-semibold text-slate-500'>
                                    <h1 className='text-[20px]'>Total Price:</h1>
                                    <p className='text-[20px] text-green-600'>₹{item?.price / 100 * item.cartQuantity}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex w-full text-xl mb-1 justify-between bg-zinc-500 border-y-2 border-y-zinc-700 font-mono gap-1 py-1 px-3'>
                   <h1 className='text-white'>Delivery status: </h1>
                   <span className='text-orange-500'>{order?.deliveryStatus}</span>
                </div>
                <div className='flex w-full text-xl justify-between px-3 font-bold text-zinc-500 bg-zinc-500 font-mono gap-1 py-1 border-y-2 border-y-zinc-700'>
                   <h1 className='text-white'>SubTotal: </h1>
                   <span className='text-green-600'>₹{order?.subTotal / 100}</span>
                </div>
               </div>
           </div>
           {/* USER DETAILS */}
           <div className='flex w-full flex-col sm:w-[60%] h-fit rounded-lg p-4 bg-slate-100 gap-5'>
             <h1 className='w-full text-center font-mono font-semibold text-xl border-b-2 border-b-slate-300 pb-3'>
                User Informations
             </h1>
             <div className='flex w-full gap-1 border-b-2 border-b-slate-300'>
                <h1>Name:</h1>
                <b>{order?.userName}</b>
             </div>
             <div className='flex w-full gap-1 border-b-2 border-b-slate-300'>
                <h1>ID:</h1>
                <b>{order?.id}</b>
             </div>
             <div className='flex w-full gap-1 border-b-2 border-b-slate-300'>
                <h1>Email:</h1>
                <b>{order?.email}</b>
             </div>
             <div className='flex w-full gap-1 border-b-2 border-b-slate-300'>
                <h1>Address:</h1>
                <b>{order?.full_address}</b>
             </div>
             <div className='flex w-full gap-1 border-b-2 border-b-slate-300'>
                <h1>Postal code:</h1>
                <b>{order?.postalCode}</b>
             </div>
           </div>
        </div>
        }
    </div>
  )
}

export default OrderDetails