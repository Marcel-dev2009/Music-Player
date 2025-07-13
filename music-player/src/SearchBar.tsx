import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

 
 function SearchBar({theme = 'dark'}) {
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
 /*  Autofocus input when appears */
   useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);
 /*   Handle Esc Keyword */

    useEffect(() => {
      const handleEscape = (e:KeyboardEvent) => {
       if(e.key === 'Escape'){
        setShowInput(false);
        setSearchValue('');
       }
      }
        if(showInput){
          document.addEventListener('keydown',handleEscape);
          return () => document.removeEventListener('keydown' , handleEscape);
        }
    }, [showInput]);
    const isDark = theme === 'dark';

   return (
    <>
     <div className='flex items-center '>
       <AnimatePresence mode='wait'>
          {!showInput ? (
            <motion.button
            key="search-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowInput(true)}
            className={`
              p-2 rounded-full transition-all duration-200 
              ${isDark 
                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }
              active:scale-95 focus:outline-none
            `}
            >
         <Search className="w-5 h-5" />
            </motion.button>
          ) :(
            <motion.div
            key="search-input"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center"
            >
             <div className='relative z-1000'>
                  <motion.input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                initial={{ width: 0 }}
                animate={{ width: '280px' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`
                  pl-10 pr-10 py-2 rounded-full border-2 outline-none
                  transition-all duration-200
                  ${isDark 
                    ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-gray-400' 
                    : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:border-gray-500'
                  }
                  w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]
                `}
              />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <button
               type="button"
                onClick={() => {
                  setShowInput(false);
                  setSearchValue('');
                }}
                className={`
                  absolute right-2 top-1/2 transform -translate-y-1/2 
                  p-1 rounded-full transition-all duration-200
                  ${isDark 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }
                  hover:scale-110 active:scale-95
                `}
              >
                   <X className="w-4 h-4" />
              </button>
             </div> {/* middle div end */}
            </motion.div>
       
             )}
          
       </AnimatePresence>
     </div> {/* 1st div end */}
    </>
   )
 }
 export default  SearchBar;