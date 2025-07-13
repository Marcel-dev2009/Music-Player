  import { Search } from 'lucide-react';
  import { useState } from 'react';
  import { AnimatePresence,motion } from 'framer-motion';
  export default function SearchBar() {
    const [showInput , setShowInput] = useState(false);
    return (
      <div className='flex items-center space-x-2'>
            <Search
            className='cursor-pointer'
            onClick={() => setShowInput(!showInput)}
            />
            {showInput && (
              <motion.input
              initial={{width:0 , opacity: 0}}
              animate={{width:500 , opacity:1}}
              exit={{width : 0 , opacity: 0 }}
              transition={{duration:0.3}}
              type='text'
              placeholder='Search...'
              className=' Search-input bg-white transition-all duration-300 border-b border-white text-black px-2 py-1 outline-none rounded-full p-2'/>
            )}
            <AnimatePresence/>
      </div>
    )
  }
  