import React, { useEffect } from 'react';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation} from '@apollo/client';
import LOGIN_USER from '../graphql/authQueries';
import { setToken, setUser } from '../features/auth/authSlice';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {Link, useNavigate} from 'react-router-dom';

import login_bg from '../images/bg1.jpg';
import LoadingSpinner from '../components/Loading';

const initialState = {
  email:'',
  password:''
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [visibleP, setVisisbleP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user }= useSelector((state)=> state.auth)

  const [loginUser] = useMutation(LOGIN_USER);

  const {email, password} = formData;

  const onChangeHandler = (e)=>{
    const {name, value} = e.target;
    setFormData({...formData, [name]:value});
  };

  useEffect(()=>{
    if(user){
      navigate('/')
    }
},[navigate, user]);

const visilbleHandler = ()=>{
  setVisisbleP((prev)=> !prev);
};

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      const {data} = await loginUser({variables:{email, password}});
    
      const {token} = data.loginUser;
  
      dispatch(setToken(token))
      dispatch(setUser(data.loginUser));
    
      if(token){
        navigate('/')
      }
    } catch (error) {
      setLoading(false)
      console.log(error.message);
      setError(error.message)
    }
  };


  if(loading){
    return <LoadingSpinner/>
  }

  return(
    <div className='flex flex-col sm:flex-row w-full min-h-screen items-center justify-center p-5 gap-4'
    style={{
      backgroundImage: `url(${login_bg})`,
      backgroundSize: 'cover',
    }}
    >
      {/* LEFT SECTION */}
      <form 
      onSubmit={onSubmitHandler}
      className='flex flex-col w-[80%] sm:w-[70%] gap-3 rounded-lg h-fit p-12 bg-black bg-opacity-60 text-white shadow-sm shadow-white'
      >
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
        className='w-full border-y-[3px] border-y-teal-600 border-x-[1px] border-x-teal-700 rounded-lg outline-none px-2 text-white bg-transparent placeholder:text-white hover:scale-[102%] transition duration-1000 hover:border-y-[5px]'
        >
          Login
        </button>  
        <Link to='/forgot-password' className='text-sm font-mono'>
          FORGOT PASSWORD?
        </Link>
        <div className='flex flex-wrap gap-1'>
            <p>Don't have an account?</p>
            <Link to='/register' className='text-amber-400 font-bold'>Rgister</Link>
        </div>
        <p className='text-red-600 text-xl bg-red-800 bg-opacity-40 p-4 rounded-lg font-mono font-semibold'>
            {error}
          </p> 
      </form>
      {/* RIGHT SECTION */}
      <div className='flex flex-col w-[80%] sm:w-[70%] justify-center items-center bg-black bg-opacity-50  py-12 shadow-sm shadow-white'>
        <h1 className='text-xl text-slate-50'>Login Here</h1>
        <h1 className='text-2xl text-amber-400 font-serif'>The test that would never forget!</h1>
        <p className='text-sm font-bold text-slate-200'>WE ARE HERE TO SERVE YOU THE BEST, AS YOU DESERVE IT!</p>
      </div>
    </div>
  )
}

export default Login