import React from 'react'
import { Link, useLocation } from 'react-router-dom'


const DashboardSidebar = () => {
  const location = useLocation();
  const {pathname} = location;

  console.log(pathname);

  const activeLink = 'border-y-[3px] text-[18px] font-semibold font-mono border-y-yellow-500 w-full px-9 text-center bg-white text-yellow-500'
  const inActiveLink = 'border-y-[3px] text-[18px] font-semibold font-mono border-y-yellow-500 w-full px-9 text-center bg-transparent text-slate-100'
  
  return (
    <div className='flex flex-col gap-5 w-fit  h-screen bg-zinc-800 text-white items-center justify-center'>
        <Link to='/dashboard' className={pathname === '/dashboard' ? activeLink : inActiveLink}>Foods</Link>
        <Link to='create-food' className={pathname === '/dashboard/create-food' ? activeLink : inActiveLink}>CreateFood</Link>
        <Link to='orders' className={pathname === '/dashboard/orders' ? activeLink : inActiveLink}>Orders</Link>
        <Link to='users' className={pathname === '/dashboard/users' ? activeLink : inActiveLink}>Customers</Link>
    </div>
  )
}

export default DashboardSidebar