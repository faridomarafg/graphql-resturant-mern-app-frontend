import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {useParams} from 'react-router-dom';
import { RESET_PASSWORD } from '../graphql/authQueries';


const ResetPassword = () => {
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [newPassword, setNewPassword] = useState('');
  const {resetToken} = useParams();
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await resetPassword({
        variables:{resetToken, newPassword}
     });
     const {message} = data.resetPassword
     setMessage(message);
     setNewPassword('')
     console.log(data);
    } catch (error) {
      console.log(error.message);
      setError(error.message)
    }
  };

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center gap-3'>
      <h1 className='text-2xl font-mono text-zinc-700 font-semibold'>RESET PASSWORD</h1>
        <form
        onSubmit={onSubmitHandler}
        className='flex flex-col w-[65%] p-4 border border-zinc-700 items-center gap-4'
        >
          <input 
          type="password" 
          value={newPassword}
          onChange={(e)=> setNewPassword(e.target.value)}
          placeholder='Enter Your New Password'
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

export default ResetPassword