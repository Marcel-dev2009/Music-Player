import React from 'react';
import MusicCard from './MusicCard';
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect} from 'react';
import { motion } from 'framer-motion';
export interface MusicItem {
  id: string;
  title: string;
  artist: string;
  coverImage?: string;
  type: 'playlist' | 'album' | 'artist';
  trackCount?: number;
  isLiked?: boolean; 
  
}

interface MusicGridProps {
  items: MusicItem[];
  isExpanded?: boolean;
  onPlay?: (id: string) => void;
  onLike?: (id: string) => void;
  onShare?: (id: string) => void;
  theme : string;
}


const MusicGrid: React.FC<MusicGridProps> = ({
  items,
  isExpanded = true,
  onPlay,
  onLike,
  onShare,
  theme = 'dark'
}) => {
  // Calculate grid columns based on sidebar state
  const isDark = theme === 'dark';
  const getGridCols = () => {    
    if (isExpanded) {
      // Sidebar width: 64 (16rem), more space for cards
      return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
    } else {
      // Sidebar width: 16 (4rem), less space for cards
      return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7';
    }
  };
 const [userName , setUserName] = useState<string|null>(null);
 const [loading , setloading] = useState(true);
useEffect(() => { 
  const auth = getAuth();
   const getuserName = onAuthStateChanged(auth , async (user) => {
    
 if(user){
   const userRef = doc(db, 'users', user.uid);
   try{
     const userData = await getDoc(userRef);
     if(userData.exists()){
      const name:string = userData.data().name;
      setUserName(name);
      setloading(false);
      return name;
     } else{
      console.log('No user data');
     }
   } catch(error){
    console.error('Error fetching user data:', error);
   }
   /* finally{
    setloading(false);
   } */
 } else{
  console.error('No user is signed in');
  setloading(false);
 }

}); /* AuthstageChanged end */
 return () => getuserName();
}, []);
  return ( 
    <div className={`min-h-screen text-white ${isDark ? 'bg-black' : 'bg-white'} 
    `}>
      {/* Header Section */}
      <div className={` p-6  ${isDark ? 'border border-white/10 rounded-xl bg-linear-65 from-black to-blue-900': 'border rounded-xl border-black bg-linear-65 from-white to-blue-300 '}`}>
        <h1 className={`text-3xl font-bold  mb-2 ${isDark ? 'text-white' : 'text-black'}`}> 
            {loading ? (
               <div>
                <div className='bg-black/10 border border-white/10 p-2 rounded-full animate-pulse w-16'></div>
                <div className='bg-black/10 border border-white/10 p-2 rounded-full animate-pulse w-26'></div>
               </div>
            ) : (
             <motion.p
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             transition={{ duration: 0.5, delay: 0.2 }}
              >
              {userName ? `Welcome , ${userName}` : 'Welcome to Muse Player'}
             </motion.p>
            )
            }
          </h1>  
        <p className={isDark ? 'text-[#f5f5f5]' : 'text-black'}>Discover and enjoy your favorite tracks</p>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Recently Played Section */}
        <section>
          <h2 className={`text-xl font-semibold  mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Recently Played</h2>
          <div className={`grid ${getGridCols()} gap-4`}>
            {items.slice(0, 6).map((item) => (
              <MusicCard
                key={item.id}
                {...item}
                onPlay={onPlay}
                onLike={onLike}
                onShare={onShare}
                theme={theme}
              />
            ))}
          </div>
        </section>

        {/* Made for You Section */}
        <section>
          <h2 className={`text-xl font-semibold  mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Made for You</h2>
          <div className={`grid ${getGridCols()} gap-4`}> 
            {items.slice(6, 12).map((item) => (
              <MusicCard
                key={item.id}
                {...item}
                onPlay={onPlay}
                onLike={onLike}
                onShare={onShare}
                theme={theme}
              />
            ))}
          </div>
        </section>

        {/* Popular Playlists Section */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Popular Playlists</h2>
          <div className={`grid ${getGridCols()}  gap-4`}>
            {items.slice(12).map((item) => (
              <MusicCard
                key={item.id}
                {...item}
                onPlay={onPlay}
                onLike={onLike}
                onShare={onShare}
                theme={theme}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MusicGrid;