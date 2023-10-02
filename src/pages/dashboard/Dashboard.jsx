import {Routes, Route} from 'react-router-dom';
import DashboardSidebar from '../../components/DashboardSidebar';

import CreateFood from './CreateFood';
import Foods from './Foods';
import Orders from './Orders';
import Users from './Users';


const Dashboard = () => {
  return (
    <div className='flex w-full'>
      <DashboardSidebar/>
      <div className='flex w-full overflow-x-auto'>
        <Routes>
            <Route path='/' element={<Foods/>}/>
            <Route path='/create-food' element={<CreateFood/>}/>
            <Route path='/edit-food/:id' element={<CreateFood/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/edit-order/:id' element={<Orders/>}/>
            <Route path='/users' element={<Users/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard