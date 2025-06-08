
import { motion } from 'framer-motion';
import Logo from './logo';
import Themetoggle from './Themetoggle';
import logo from './assets/logo.png';
import Profile from './profile';
import { useNavigate } from 'react-router-dom';
function App() {
 const navigate = useNavigate();
 const handleEnterApp = () => {
    navigate('/Main');
  }
 
  return (
 <>
      <div className=' m-6 flex justify-between items-center'>
        <img src={logo} alt="Image" style={{width:"2rem"}} />
         <Themetoggle/>
       </div>

     <Logo/>
   
    <div className='h-screen  flex flex-col justify-center items-center  transition-all'>
          
          <motion.div
            initial={{x: -100, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration:0.6, ease: "easeInOut"}}
          >
             <div className='flex justify-center items-center mb-4  p-5 border w-50 round Person '>
            <Profile/>
             </div>
          </motion.div>
         
          <motion.h1  initial={{y : -100, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{type: "spring", stiffness: 100, duration: 1.5 , }}
            className='text-2xl md:text-5xl font-200 text-center text-pink-500 dark:text-pink-200 name '
          >
             
            Happy Birthday Steph! 🎉 💖 
          </motion.h1>

          <button onClick={handleEnterApp} className='mt-6 px-6 py-2 md:text-2xl font- border-2 rounded-4xl shadow-lg hover:bg-white hover:text-black hover:animate-pulse hover:duration-300 ease-in-out'>
            🎧 Enter Muse Player
          </button>
    </div>
 </>
  );
}

export default App;
/* sm:text-5xl lg:text-7xl */ 
/* dark:bg-gray-900  */
/* bg-white */