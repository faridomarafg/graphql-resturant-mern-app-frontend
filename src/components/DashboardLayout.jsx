import React from 'react'
import DashboardSidebar from './DashboardSidebar'

const DashboardLayout = ({children}) => {
  return (
    <div className='flex'>
        <DashboardSidebar/>
        {children}
    </div>
  )
}

export default DashboardLayout