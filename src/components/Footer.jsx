import {useLocation} from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const {pathname} = location;

  return (
    <div className='flex w-full'>
      {pathname !== '/login' && pathname !== '/register' && pathname !== '/forgot-password'  ? 
      <div className='flex flex-col sm:flex-row w-full min-h-[200px] bg-black text-white border-y-[5px] border-y-yellow-500 shadow-inner'>
          {/* LEFT SIDE */}
          <div className='flex flex-col w-full p-4 justify-center gap-2 text-xl'>
            <div className="flex gap-3">
              <h1 className="text-teal-600 font-bold font-mono">Mobile:</h1>
              <span className="font-mono">007-333-444-55</span>
            </div>
            <div className="flex gap-3">
              <h1 className="text-teal-600 font-bold font-mono">Email:</h1>
              <span className="font-mono">email@gmail.com</span>
            </div>
            <div className="flex gap-3">
              <h1 className="text-teal-600 font-bold font-mono">Address:</h1>
              <span className="font-mono">The address to display here</span>
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div className='flex flex-col w-full rounded-lg p-1'>
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56064.762305803924!2d77.16995864863283!3d28.568331999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce39b59a48a1f%3A0xf7d632d4ea6029c5!2sRestaurant%20mazar!5e0!3m2!1sen!2sin!4v1696070218799!5m2!1sen!2sin" 
            width="600" 
            height="450"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[250px]"
            title="mazar-resturant"
            >

            </iframe>
          </div>
      </div> 
      : ''}
    </div>
  )
}

export default Footer