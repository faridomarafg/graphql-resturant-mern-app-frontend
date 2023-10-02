import {useMutation} from '@apollo/client';
import { FORGOT_PASSWORD } from '../graphql/authQueries';
import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);



  const onSubmitHandler = async (e)=>{
     try {
      e.preventDefault();
      const {data} = await forgotPassword({
         variables:{email}
      });
      const {message} = data.forgotPassword
      setMessage(message);
      setEmail('')
     } catch (error) {
       setError(error?.message)
     }
  };

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center gap-3'>
      <h1 className='text-2xl font-mono text-zinc-700 font-semibold'>FORGOT PASSWORD?</h1>
        <form
        onSubmit={onSubmitHandler}
        className='flex flex-col w-[65%] p-4 border border-zinc-700 items-center gap-4'
        >
          <input 
          type="email" 
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          placeholder='Enter Your Email'
          className='w-full border border-zinc-700 outline-none px-2 rounded-lg'
          />
          <button className='border border-zinc-700 rounded-lg w-fit px-5'>Submit</button>
          <p className={message ? 
          'text-green-600 font-mono font-semibold' : 
          'text-red-600 font-mono font-semibold' }>
            {message && message ? message : error}
          </p>
        </form>
    </div>
  )
}

export default ForgotPassword