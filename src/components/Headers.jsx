

import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSelector,useDispatch } from 'react-redux';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { clearAuth, setLogout } from '../features/auth/authSlice';
import { CALCULATE_TOTAL_QUANTITY } from '../features/wishListSlice';
import Search from './Search';


const Headers = () => {
  const [scrollPage, setScrollPage] = useState(false);
  const [toggle, setToggle] = useState(true);
  const {token, user} = useSelector((state)=> state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
   
  const location = useLocation();
  const {pathname} = location;

  const {cartTotalQuantity,cartItems} = useSelector((state)=> state.wishList);

  useEffect(()=>{
     dispatch(CALCULATE_TOTAL_QUANTITY());
  },[dispatch,cartItems]);

  const logoutHandler = async()=>{
    dispatch(setLogout());
    dispatch(clearAuth());
     navigate('/login')
  };

  const fixScroll = ()=>{
    if(window.scrollY >100){
      setScrollPage(true);
    }else{
      setScrollPage(false);
    }
  };
  window.addEventListener('scroll', fixScroll);

  const toggleHandler = ()=>{
     setToggle((prev)=> !prev);
  };

  return (
    <div className='flex w-full'>
      <div className={scrollPage ? 'flex w-full h-[100px] bg-black text-white justify-between items-center px-4 fixed z-50':
      'flex w-full h-[100px] bg-black text-white justify-between items-center px-4 z-50'}
      >
        <Link to='/' className='text-2xl text-yellow-500 font-mono font-semibold'>
          MAZAR_RESTURANT
        </Link>
        {/* Food categories section */}
        <div className='hidden sm:flex'>
          {pathname === '/'  || pathname === '/dashboard' ?  <Search/> : null}
        </div>
        <div className='hidden sm:flex justify-between items-center gap-4'>
          {token ? 
          (<>
             <div className='flex gap-3 items-center'>
              {user?.role === 'admin' && <Link to='/dashboard' className='text-[17px] font-semibold'>Dashboard</Link>}
              {user && <Link to='/account' className='font-bold'>Account</Link>}
               <button onClick={logoutHandler} className='text-[17px] font-semibold'>Logout</button>
               <Link to='/wish-list' className='flex relative'>
                  <AiOutlineHeart className='text-[33px] cursor-pointer'/>
                  <span className='text-xl absolute top-[-23px] right-[9px]'>
                    {cartTotalQuantity}
                  </span>
               </Link>
             </div>
          </>) 
          : 
          (<>
            <Link to='/login' className='text-[17px] font-semibold'>
              Login
            </Link>
            <Link to='/register' className='text-[17px] font-semibold'>
              Register
            </Link>
            <Link to='/wish-list'>
                <AiOutlineHeart className='text-[33px] cursor-pointer'/>
                <span className='text-xl absolute top-[10px] right-[25px]'>
                  {cartTotalQuantity}
                </span>
            </Link>
          </>)}
        </div>
          {/* MOBILE MENUE */}
          <div className='flex  sm:hidden relative'>
          {/* Toggle icon */}
          <div className='flex sm:hidden items-center gap-4'>
            <Link to='/wish-list'>
                <AiOutlineHeart className='text-[40px] cursor-pointer'/>
            </Link>
            <GiHamburgerMenu onClick={toggleHandler} className='text-[40px] cursor-pointer z-50'/>
          </div>
          <div className={toggle ? 'hidden absolute right-[150px]':
            'flex w-[300px] px-10 h-screen flex-col items-center justify-center bg-black bg-opacity-70 absolute right-[-20px] z-0'}
            >
            <Search toggleHandler={toggleHandler}/>
            {token ? 
              (<>
                <div className='flex flex-col gap-3 items-center pt-3'>
                  <Link onClick={toggleHandler} to='/dashboard' className='text-[17px] font-semibold'>Dashboard</Link>
                  <Link to='/account' className='font-bold'>Account</Link>
                  <button onClick={logoutHandler} className='text-[17px] font-semibold'>Logout</button>
                </div>
              </>) 
              : 
              (<div className='flex flex-col items-center'>
                <Link onClick={toggleHandler} to='/login' className='text-[17px] font-semibold py-3'>
                  Login
                </Link>
                <Link onClick={toggleHandler} to='/register' className='text-[17px] font-semibold'>
                  Register
                </Link>
              </div>)}
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Headers;