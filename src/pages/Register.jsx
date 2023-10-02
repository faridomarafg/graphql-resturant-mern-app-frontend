import React,{useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';
import { REGISTER_USER } from '../graphql/authQueries';
import {Link,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import register_bg from '../images/bg3.webp';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

const initialState = {
  name:"",
  email:'',
  password:''
};

const Register = () => {
  const [visibleP, setVisisbleP] = useState(false);
  const [message, seMessage] = useState()
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const {user} = useSelector((state)=> state.auth);

  const [registerUser] = useMutation(REGISTER_USER);

  const {name,email, password} = formData;

  const onChangeHandler = (e)=>{
    const {name, value} = e.target;
    setFormData({...formData, [name]:value});
  };

  useEffect(()=>{
    if(user){
      navigate('/login')
    }
},[navigate, user]);

const visilbleHandler = ()=>{
  setVisisbleP((prev)=> !prev);
};

  const onSubmitHandler = async (e)=>{
      try {
        e.preventDefault();
        const {data} = await registerUser({
          variables: { ...formData },
        });
    
        const {message} = data.registerUser;
        seMessage(message)
        setFormData(initialState)
      } catch (error) {
        console.log(error);
      }
  };


  return(
    <div className='flex flex-col w-full min-h-screen items-center justify-center gap-3'
    style={{
      backgroundImage: `url(${register_bg})`,
      backgroundSize: 'cover', 
    }}
    >
      <h1 className='text-4xl text-slate-200 font-mono'>Register</h1>
      <form 
      onSubmit={onSubmitHandler}
      className='flex flex-col w-[80%] sm:w-[50%] gap-3 px-9 py-14 rounded-lg bg-black bg-opacity-60 h-fit'
      >
         <input 
         type="text" 
         name='name'
         placeholder='Name'
         value={name}
         onChange={onChangeHandler} 
        className='w-full border-y-[3px] border-y-yellow-400 border-x-[1px] border-x-yellow-500 rounded-lg outline-none px-2 text-white bg-transparent placeholder:text-white'
          />
        <input 
         type="text" 
         name='email'
         placeholder='Email'
         value={email}
         onChange={onChangeHandler} 
        className='w-full border-y-[3px] border-y-yellow-400 border-x-[1px] border-x-yellow-500 rounded-lg outline-none px-2 text-white bg-transparent placeholder:text-white'
          />
        <div className='relative'>
          <input 
          type={visibleP ? "text" : 'password'}
          name='password'
          placeholder='Password'
          value={password}
          onChange={onChangeHandler} 
          className='w-full border-y-[3px] border-y-yellow-400 border-x-[1px] border-x-yellow-500 rounded-lg outline-none px-2 text-white bg-transparent placeholder:text-white'
            />
          <div className='absolute top-[5px] right-[25px]'>
           {visibleP ? 
            <AiOutlineEyeInvisible 
            className='absolute text-[20px] text-slate-200 cursor-pointer'
            onClick={visilbleHandler}
            /> 
            :
            <AiOutlineEye 
            className='absolute text-[20px] text-slate-200 cursor-pointer'
            onClick={visilbleHandler}
            />
          }
          </div>    
        </div>  
        <button 
        type='submit' 
        className='w-full border-y-[3px] border-y-teal-600 border-x-[1px] border-x-teal-700 rounded-lg outline-none px-2 text-white bg-transparent placeholder:text-white hover:scale-[102%] transition duration-1000 hover:border-y-[5px]'
        >
          Register
        </button>  
        {
        message && <h1 className='rounded-lg bg-green-600 text-white font-mono w-full text-center py-1'>{message}</h1>
        }
        <div className='flex flex-wrap gap-1 text-slate-50'>
            <p>Already have an account?</p>
            <Link to='/login' className='text-yellow-500 font-bold'>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register