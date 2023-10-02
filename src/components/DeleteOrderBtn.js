import {useQuery, useMutation} from '@apollo/client';
import { useState } from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { DELETE_ORDER, GET_ORDERS } from '../graphql/orderQueries';


const DeleteOrderBtn = ({id}) => {
    const [error, setError] = useState(null);
    useQuery(GET_ORDERS);

    const [deleteOrder] = useMutation(DELETE_ORDER, {
        update(proxy) {
          // Remove the deleted order object from the cache
          const data = proxy.readQuery({
            query: GET_ORDERS,
          });
    
          const updatedOrders = data.getOrders.filter((order) => order.id !== id);
    
          proxy.writeQuery({
            query: GET_ORDERS,
            data: { getOrders: updatedOrders },
          });
        },
        variables: {
          id,
        },
        onError (error){
         setError(error.message)
        }
      });

      const deleteHandler = () => {
        if (window.confirm('Are you sure you want to delete this order?')) {
          try {
            deleteOrder();
          } catch (error) {
            console.log(error);
          }
        }
      };

      const deleteModelHandler = ()=>{
        setError(!error)
      }

  if(error){
    return(
        <div className='flex w-full h-screen items-center justify-center bg-black bg-opacity-60 absolute top-0 right-0 '>
            <div className='flex w-[60%] h-[150px] bg-white items-center justify-center rounded-lg relative'>
                <h1 className='w-full text-center text-[17px] font-mono font-semibold text-red-700'>{error}</h1>
                <AiOutlineCloseCircle  
                className='flex text-[30px] absolute top-1 right-1 cursor-pointer'
                onClick={deleteModelHandler}
                />
            </div>
        </div>
    )
  }
  return (
    <div>
        <AiOutlineCloseCircle onClick={deleteHandler} className='text-[20px] text-red-700 cursor-pointer' />
    </div>
  )
}

export default DeleteOrderBtn