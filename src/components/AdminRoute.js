import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const AdminRoute = ({children}) => {

    const {user} = useSelector((state)=> state.auth);

    if(user?.role === 'admin'){
        return( 
        <div>
            {children}
        </div>
        )
    }else{
        return(
            <section className='flex flex-col w-full items-center justify-center bg-blue-600 h-[709px]'>
            <div className='flex flex-col w-full items-center'>
                <h1 className='text-[16px] sm:text-2xl md:text-2xl text-red-400'>Permission Denied!</h1>
                <p className='text-slate-200 w-full text-center'>This page Can access only by Admin!</p>
                <button className='w-[150px] py-1 bg-pink-400 text-white border-none font-playfair rounded-lg my-2'>
                   <Link to='/'>Home</Link>
                </button>
            </div>
            
        </section>
        )
    }


}

export default AdminRoute