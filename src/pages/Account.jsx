import {gql, useQuery, useMutation} from '@apollo/client';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../components/Loading';
import DeleteOrderBtn from '../components/DeleteOrderBtn';
import { clearAuth, setLogout } from '../features/auth/authSlice';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


const Account = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedPart, setSelectedPart] = useState(true);
    const [error, setError] = useState('');

    const {data, loading} = useQuery(GET_ORDERS);
    const {user} = useSelector((state)=> state.auth);
    const orders = data?.getOrders;

    useEffect(()=>{
        if(!user){
          navigate('/login')
        }
    },[navigate, user]);

    const [deleteUser] = useMutation(DELETE_USER,{
        variables:{
            id: user?.id
        },
        onError(error){
            setError(error.message)
        }
    })

    const handelSelector = ()=>{
        setSelectedPart((prev)=> !prev)
    };

    const deleteHandler = () => {
        if (window.confirm('Are you sure you want to delete this account?')) {
          try {
            deleteUser();
            dispatch(clearAuth());
            dispatch(setLogout());
            navigate('/login')
          } catch (error) {
            console.log(error);
          }
        }
      };
   
    if(loading){
        return <LoadingSpinner/>
    }

  return (
    <div className='flex flex-col w-full min-h-screen  items-center bg-slate-300'>
        {/* SELECTING BUTTONS */}
        <div className='flex flex-col sm:flex-row  w-full h-fit bg-black p-2 gap-2 border-y border-y-yellow-500 py-3'>
            <button 
                onClick={handelSelector} 
                disabled={selectedPart} 
                className={selectedPart ? 'flex w-full justify-center items-center bg-transparent border-y-2 border-y-green-700 border-x border-x-green-500 rounded-lg text-slate-300 font-mono text-xl' :
                'flex w-full justify-center items-center bg-transparent border-y-2 border-y-slate-400 border-x border-x-slate-600 rounded-lg text-slate-300 font-mono text-xl'
             }
            >
               Orders
            </button>
            <button 
                onClick={handelSelector} 
                disabled={!selectedPart} 
                className={!selectedPart ? 'flex w-full justify-center items-center bg-transparent border-y-2 border-y-green-700 border-x border-x-green-500 rounded-lg text-slate-300 font-mono text-xl':
                'flex w-full justify-center items-center bg-transparent border-y-2 border-y-slate-400 border-x border-x-slate-600 rounded-lg text-slate-300 font-mono text-xl'   
            }
            >
               Profile
            </button>
        </div>
        {/* ORDER SECTION */}
        <div className={selectedPart ? 'flex flex-col w-[95%] sm:w-[80%] mt-4  p-4 rounded-lg bg-white' : 'hidden w-[98%] mt-4  p-4 rounded-lg bg-white'}>
            {orders?.map((order, index)=>(
                <div key={index}>
                {user?.id === order?.userId &&
                    <div className='flex w-full flex-col sm:flex-row items-start justify-between gap-2 relative m-1 border-2 border-slate-500 rounded-lg'>
                        <div className='flex w-full flex-col gap-2'>
                            {order?.line_items.map((item, index)=>(
                                <div key={index} className='flex gap-3'>
                                <img 
                                src={item?.images[0]} 
                                alt={item?.name} 
                                className='w-[200px] h-[100px]'
                                />
                                <div className='flex flex-col'>
                                    <div className='flex'>
                                            <h1>Name:</h1>
                                            <b>{item?.name}</b>
                                        </div>
                                        <div className='flex'>
                                            <h1>Quantity:</h1>
                                            <b>{item?.cartQuantity}</b>
                                        </div>
                                        <div className='flex'>
                                            <h1>Price:</h1>
                                            <b>₹{item?.price / 100}</b>
                                        </div>
                                        <div className='flex'>
                                            <h1>Total:</h1>
                                            <b>₹{item?.price / 100 * item?.cartQuantity}</b>
                                        </div>
                                </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col w-full sm:w-[70%] gap-2 text-lg justify-end  text-slate-500 p-2 '>
                        {/* DELETE ORDER BTN     */}
                        <div className='flex w-full items-end sm:justify-end pr-[10px] px-1'>
                            <DeleteOrderBtn id={order.id}/>
                        </div>
                          <div className='flex flex-wrap gap-1 '>
                            <h1>Delivery Status:</h1>
                            <p className={order?.deliveryStatus === 'Deliveried' ? 'font-bold text-orange-500' :'font-bold text-slate-500'}>{order?.deliveryStatus}</p>
                          </div>
                          <div className='flex flex-wrap gap-1'>
                            <h1>SubTotal:</h1>
                            <p className='font-mono text-green-700 font-bold'>₹{order?.subTotal / 100}</p>
                          </div>
                        </div>

                    </div>
                }
                </div>
            ))}
        </div> 
        {/* USER PROFILE SECTION */}
        <div className={!selectedPart ? 'flex flex-col w-[65%] mt-4  p-4 rounded-lg bg-white' : 'hidden w-[98%] mt-4  p-4 rounded-lg bg-white '}>
            <div className='flex flex-wrap gap-1 text-xl font-mono text-zinc-700 font-semibold border-b border-b-zinc-700 pb-1 mb-3'>
                <h1>Name:</h1>
                <h2>{user?.name}</h2>
            </div>
            <div className='flex flex-wrap gap-1 text-xl font-mono text-zinc-700 font-semibold border-b border-b-zinc-700 pb-1 mb-3'>
                <h1>Email:</h1>
                <h2>{user?.email}</h2>
            </div>
            <button
            type='button'
            onClick={deleteHandler} 
            className='text-lg font-mono bg-zinc-700 rounded-lg w-fit px-2 cursor-pointer text-white'
            >
                Delete account
            </button>
            {error &&<p className='w-full bg-slate-300 rounded-lg text-red-700 text-center mt-2'>{error}</p>}
        </div> 
    </div>
  )
}

export default Account;


// ========= graphql query ========
const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
    id
    userId
    deliveryStatus
    subTotal
    line_items {
      name
      cartQuantity
      price
      images
    }
    }
  }
`;


const DELETE_USER = gql`
 mutation DeleteUser($id: ID!){
    deleteUser(id:$id)
 }
`;