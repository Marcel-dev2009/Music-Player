
import { motion } from 'framer-motion';
import Logo from './logo';
import { useNavigate } from 'react-router-dom';
function App() {
 const navigate = useNavigate();
 const handleEnterApp = () => {
    navigate('/Main');
  }
 
  return (
 <>
     <Logo/>
   
    <div className='h-screen  flex flex-col justify-center items-center  transition-all'>
          <motion.h1  initial={{y : -100, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{type: "spring", stiffness: 100, duration: 1.5}}
            className='text-2xl md:text-5xl font-200 text-center text-pink-500 dark:text-pink-200  '
          >
            Happy Birthday Steph! 🎉 💖 
          </motion.h1>

          <button onClick={handleEnterApp} className='mt-6 px-6 py-2 md:text-2xl font-serif  border-2 rounded-4xl shadow-lg hover:bg-white hover:text-black hover:animate-pulse'>
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