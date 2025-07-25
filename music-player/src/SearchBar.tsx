import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface SearchBarProps {
  theme?: string;
  triggerSearch?: boolean; // Add this prop
  onSearchTriggered?: () => void; // Add this callback
  onSearch :  (query : string) => Promise<void>;
}

function SearchBar({theme = 'dark', triggerSearch = false, onSearchTriggered}: SearchBarProps) {
  const [showInput, setShowInput] = useState(false);
  const [token , setAccessToken] = useState<string|null>(null) ;
  const [query ,  setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle external trigger from BottomBar
  useEffect(() => {
    if (triggerSearch) {
      setShowInput(true);
      // Call callback to reset the trigger
      if (onSearchTriggered) {
        onSearchTriggered();
      }
    }
  }, [triggerSearch, onSearchTriggered]);
  const clientId = '1d5f097727cf4a52a39e239b984bb8d6';
  const client_secret = '2e9e16d23aa8464a957bfc7095760930';
 async function extractToken () {
    const res = await fetch(`https://accounts.spotify.com/api/token` , {
       method : 'POST',
       body : new URLSearchParams ({
        'grant_type' : 'client_credentials',
       }),
       headers:{
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(clientId + ':' + client_secret)
       }
    });
   const data = await res.json();
   const accessToken = data.access_token;
   setAccessToken(accessToken);
   console.log(accessToken);
   return data;
 }
 useEffect(() =>{
  extractToken()
 }, []);

  const handleSearch = async (query: string) => {
    try {
      const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist` , {
        headers :{
          'Authorization' : `Bearer ${token}`
        },
      });
      const data = await res.json();
      console.log(data.artists?.items[0].name);
    } catch (error) {
      console.log('Error Fetching Tracks', error);
    }
    
  };

  /* Autofocus input when appears */
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  /* Handle keyboard shortcuts */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Ctrl+K to open search bar
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setShowInput(true);
        return;
      }
      
      // Handle Escape and Enter to close search bar (only when search is open)
      if (showInput && (e.key === 'Escape')) {
        setShowInput(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showInput]);
  
  const isDark = theme === 'dark';
  localStorage.setItem('saveTheme', theme)
 return (
  <>
   <div className=' sticky z-1000 flex items-center'>
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
       <Search className="w-4 h-3 md:w-5 md:h-5 "/>
          </motion.button>
        ) :(
          <motion.div
          key="search-input"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center sticky z-10"
          >
           <div className='relative'>
                <motion.input
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    await handleSearch(query);
                  }
                }}
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Songs , Artists , Playlists"
              initial={{ width: 0 }}
              animate={{ width: '500px' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`
                pl-10 pr-10 py-2 rounded-full border-2 outline-none
                transition-all duration-200
                ${isDark 
                  ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-gray-400' 
                  : 'bg-[#f5f5f5] text-black placeholder-gray-500 border-gray-300 focus:border-gray-500'
                }
                w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] 
              `}
            />
            
             <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400'/>

            {/*   Cancellation Button */}
            <button
             type="button"
              onClick={() => {
                setShowInput(false);
                setQuery('');
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
                 <X className=" w-4 h-4" />
            </button>
           </div> {/* middle div end */}
          </motion.div>
           )}
     </AnimatePresence>
   </div> {/* 1st div end */}
  </>
 )
}

export default SearchBar;