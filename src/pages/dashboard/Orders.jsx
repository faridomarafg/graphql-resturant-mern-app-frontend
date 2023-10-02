import {AiTwotoneEdit} from 'react-icons/ai'
import {useQuery, useMutation} from '@apollo/client';
import { GET_ORDERS, EDIT_ORDER } from '../../graphql/orderQueries';
import {Link,useNavigate, useParams} from 'react-router-dom';
import LoadingSpinner from '../../components/Loading';
import DeleteOrderBtn from '../../components/DeleteOrderBtn';
import { useState } from 'react';

const Orders = () => {
  const navigate = useNavigate();
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [error, setError] = useState();
  const {data,loading} = useQuery(GET_ORDERS);

  const {id} = useParams();

  const [editOrder] = useMutation(EDIT_ORDER,{
     update(proxy, result){
       const data = proxy.readQuery({
        query: GET_ORDERS
       });

       proxy.writeQuery({
         query: GET_ORDERS,
         data: {
          getOrders: [result.data.editOrder, ...data.getOrders]
         }
       });

       navigate('/dashboard/orders')
     },

     variables:{
      deliveryStatus,
      id:id
    },
    onError(error){
      setError(error.message);
    }
  })


  const orders = data?.getOrders;

  console.log(orders);

  // Generate an array of unique background color classes
  const bgClasses = ['bg-white shadow-inner', 'bg-slate-300 shadow-sm'];
  const randomBgClasses = orders?.map(() => bgClasses.splice(Math.floor(Math.random() * bgClasses.length), 1)[0]);

  //EDIT ORDER
  const editOrderHandler = async (e)=>{
    e.preventDefault();
    editOrder();
  };

  
  if(id){
    return(
      <div className='flex flex-col w-full h-screen items-center justify-center p-4 '>
         <h1 className='w-full text-center text-xl font-mono text-teal-600 font-bold mb-3'>Update Order Delivery Status</h1>
         <form onSubmit={editOrderHandler} 
         className='flex flex-col w-full sm:w-[50%] rounded-lg bg-slate-400 items-center p-5 gap-3'
         >
            <select 
            value={deliveryStatus} 
            onChange={(e)=> setDeliveryStatus(e.target.value)}
            className='w-full rounded-lg outline-none px-1'
            >
               <option value='' disabled >Select DeliveryStatus</option>
               <option  >Pending</option>
               <option  >On the way</option>
               <option >Deliveried</option>
            </select>
            <button type='submit' className='w-full rounded-lg bg-blue-500 text-white'>
              Update
            </button>
            <button onClick={()=> navigate('/dashboard/orders')} type='button' className='w-full rounded-lg bg-red-700 text-white'>
              Cancel
            </button>
            {error &&  <div className='flex w-full p-4 items-center justify-center bg-white'>
              <p className='text-red-600'>{error}</p>
            </div>}
         </form>
      </div>
    )
  };
  //End of Edit order section--------

  return (
    <div className='flex flex-col w-full min-h-screen relative px-2'>
      <h1 className='w-full text-center text-3xl text-zinc-600 font-mono font-bold pt-3'>All Orders</h1>
       {loading ? <LoadingSpinner/> : 
             <div className='flex flex-col w-full gap-1'>
             {orders?.map((order, index)=>(
               <div key={index} 
               className={`flex flex-col sm:flex-row w-full border-2 border-zinc-600 ${randomBgClasses[index]}`}
               >
                 <div className='flex w-full flex-col border-x-0 sm:border-x border-y border-y-zinc-600 sm:border-y-0  border-x-zinc-600 px-1'>
                   <h1>Order_ID</h1>
                   <b>{order?.id}</b>
                 </div> 
                 <div className='flex w-full flex-col border-x-0 sm:border-x border-y border-y-zinc-600 sm:border-y-0  border-x-zinc-600 px-1'>
                   <h1>Customer</h1>
                   <b>{order?.userName}</b>
                 </div> 
                 <div className='flex w-full flex-col border-x-0 sm:border-x border-y border-y-zinc-600 sm:border-y-0  border-x-zinc-600 px-1'>
                   <h1>SubTotal</h1>
                   <b>₹{order?.subTotal / 100}</b>
                 </div> 
                 <div className='flex w-full flex-col border-x-0 sm:border-x border-y border-y-zinc-600 sm:border-y-0  border-x-zinc-600 px-1'>
                   <h1>Paid_status</h1>
                   <b>{order?.paid ? <span className='text-green-700'>Paid</span> : <span className='text-zinc-600'>Unpaind</span>}</b>
                 </div> 
                 <div className='flex w-full flex-col border-x-0 sm:border-x border-y border-y-zinc-600 sm:border-y-0  border-x-zinc-600 px-1'>
                   <h1>DeliveryStatus</h1>
                   <b>{order?.deliveryStatus}</b>
                 </div> 
                 <div className='flex w-full items-center border-x-0 sm:border-x border-y border-y-zinc-600 sm:border-y-0  border-x-zinc-600 px-1'>
                   <Link to={`/order-details/${order.id}`} className='text-orange-500 font-mono font-bold'>Order Details</Link>
                 </div> 
                 <div className='flex w-full justify-between items-center border-x-0 sm:border-x border-y border-y-zinc-600 sm:border-y-0  border-x-zinc-600 px-1'>
                   <DeleteOrderBtn type='button' id={order.id}/>
                   <Link to={`/dashboard/edit-order/${order.id}`}>
                    <AiTwotoneEdit className='text-[20px] text-blue-700 cursor-pointer' />
                   </Link>
                 </div> 
               </div>
             ))}
           </div>
       }
    </div>
  )
}

export default Orders;