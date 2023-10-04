import React from 'react'
import { gql, useQuery } from '@apollo/client';
import LoadingSpinner from '../../components/Loading';

const Users = () => {
    const {data, loading} = useQuery(GET_USERS);
    const users = data?.getUsers;
    console.log(users);

    if(loading){
        return <LoadingSpinner/>
    }

  return (
    <div className='flex flex-col  w-full min-h-screen bg-slate-500 items-center py-16'>
       {users?.length === 0 ? 
       (<div>
          <h1>No Customers!</h1>
       </div>) 
       :
       (<div className='flex flex-col w-[95%] sm:w-[70%] bg-white p-4 rounded-2xl gap-5'>
        <h1 className='w-full text-center text-2xl sm:text-4xl font-serif font-bold text-zinc-600'>List of Customers</h1>
        <div className='flex gap-1 items-center'>
            <h1 className=' text-xl sm:text-2xl font-serif font-bold text-teal-700'>Coutn of Customers:</h1>
            <b className='text-xl sm:text-3xl font-serif font-bold text-teal-900'>{users?.length - 1}</b>
        </div>

        <div className='flex flex-col gap-2'>
          {users?.map((user, index)=>(
            <div key={index}>
              {user?.role === 'admin' ? '' : 
                          <div key={index} className='bg-slate-200 p-2 rounded-lg'>
                          <div className='flex flex-wrap text-[18px] text-zinc-700 font-serif font-semibold gap-2  pt-1 items-center'>
                           <h1>ID:</h1>
                           <p className='font-mono text-sm'>{user?.id}</p>
                          </div>
                          <div className='flex flex-wrap text-[18px] text-zinc-700 font-serif font-semibold gap-2 border-t-[2px] border-t-zinc-500 pt-1 '>
                           <h1>Name:</h1>
                           <p>{user?.name}</p>
                          </div>
                          <div className='flex flex-wrap text-[18px] text-zinc-700 font-serif font-semibold gap-2 border-t-[2px] border-t-zinc-500 pt-1 '>
                           <h1>Email:</h1>
                           <p>{user?.email}</p>
                          </div>
                          <div className='flex flex-wrap text-[18px] text-zinc-700 font-serif font-semibold gap-2 border-y-[2px] border-y-zinc-500 pt-1 '>
                           <h1>Role:</h1>
                           <p>{user?.role}</p>
                          </div>
                       </div>
              }
            </div>
          ))}
        </div>
       </div>)
       } 
    </div>
  )
}

export default Users;


// ====== Graphql query =======
const GET_USERS = gql`
  query GetUsers {
    getUsers{
    id
    name
    email
    role
    }
  }
`;