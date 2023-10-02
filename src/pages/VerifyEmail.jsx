import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import { VERIFY_USER } from '../graphql/authQueries';
import { useMutation } from '@apollo/client';


const VerifyEmail = () => {
  const [verifyUser] = useMutation(VERIFY_USER);
  const [message, setMessage] = useState();
  const {token} = useParams();

  const verify = async ()=>{
     try {
      const {data} = await verifyUser({
        variables:{token}
       });
       const {message} = data.verifyUser;
       setMessage(message); 
     } catch (error) {
      console.log(error);
     }
  };

  useEffect(()=>{
    verify();
    // eslint-disable-next-line 
  },[]);

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center gap-5'>
      <h1 className='text-4xl text-green-700 font-mono font-semibold'>{message}</h1>
      <Link to='/login'
      className='px-6 py-1 bg-pink-700 text-white rounded-lg'
      >
        Login to continue
      </Link>
    </div>
  )
}

export default VerifyEmail