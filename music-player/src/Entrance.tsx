
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
/*  import Themetoggle from './Themetoggle'; */
 import ArtistGrid from './ArtistGrid';
/*  import Logo from './logo'; */
import logo from './assets/logo.png';
function Entrance() {
   const navigate = useNavigate();
 const handleEnterApp = () => {
    navigate('/auth');
  }
   return(
    <>
       <div className=' m-5 flex justify-between items-center'>
        <img src={logo} alt="Image" style={{width:"1.5rem"}} />
      {/*    <Themetoggle/> */}
       </div>
      <span>
          {/*  <Logo/> */}
      </span>
      
      <motion.h1
      initial={{x: -100, opacity:0}}
      animate={{x: 0 , opacity:1}}
      transition={{type:"spring", stiffness: 100, duration:2}}
      className='flex justify-center items-center heading text-center'
      >
        Your ultimate destination for an immersive musical experience. <br />
        Dive into a world of endless tunes, personalized playlists, <br />
         and seamless listening. Let the music move you!
      </motion.h1>
           <div className='flex flex-col'>
          <ArtistGrid/>
       <motion.button
        initial={{opacity:0, y:40}}
        animate={{opacity:1, y:2}}
        transition={{duration:0.5, ease:'easeInOut'}}
        whileTap={{scale:0.95}}
        onClick={handleEnterApp}
        className='
        px-6 py-3 bg-gray-800 text-white rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 w-96  margin mb-3
        '
        >
             Launch App
        </motion.button> 
           </div>
    </>
   )
}
export default Entrance;