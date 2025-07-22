import SearchBar from "./SearchBar";
import BottomBar from "./Bottombar";
import Sidebar from "./sidebar";
import Themetoggle from "./Themetoggle";
import { useEffect, useState } from "react";
 import MusicGrid  from "./musicGrid";
 import { Outlet } from 'react-router-dom';
import type { MusicItem } from "./musicGrid"; 
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase";
export default function MusicApp() {
const [theme ,  setTheme] = useState('dark');
const [triggerSearch , setTriggerSearch] = useState(false);
const [activeTab , setActiveTab] = useState('home');
const [photo ,  setphoto] = useState('');
const [loading , setloading] = useState(true);
/* const [sidebarExpanded , setIsExpanded] = useState(true); */
const MusicItems: MusicItem[] = [
   {
      id : '1',
      title : 'Chill Vibes',
      artist : 'Various Artists',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 25,
      isLiked : true,
   },
   {
      id : '2',
      title : 'Focus Beats',
      artist : 'DJ Focus',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 40,
      isLiked : false
   },
   {
      id : '3',
      title : 'Top Hits',
      artist : 'Chart Toppers',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount: 30,
      isLiked : true
   },
   {
      id : '4',
      title : 'Throwback',
      artist : 'Retro Kings',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 18,
      isLiked : false
   },
   {
      id : '5',
      title : 'Indies Mix',
      artist : 'Indie Stars',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 22,
      isLiked : true
   },
   {
      id : '6',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '7',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '8',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '9',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '10',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '11',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '12',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '13',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '14',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '15',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '16',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '17',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '18',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '19',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '20',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '21',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '22',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '23',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
   {
      id : '24',
      title : 'Rap Caviar',
      artist : 'Hip Hop Central',
      coverImage: '/Static-assets/DSC.jpeg',
      type : 'playlist',
      trackCount : 50,
      isLiked : true
   },
] 
 const [musicItems, setMusicItems] = useState(MusicItems);
  const handlePlay = (id: string) => {
    console.log('Playing music with ID:', id);
    // Add your play logic here
    // Example: playTrack(id) or setCurrentTrack(id)
  };
  
  const handleLike = (id: string) => {
    console.log('Toggling like for ID:', id);
    // Update the liked state
    setMusicItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, isLiked: !item.isLiked }
          : item
      )
    );
  };
    const handleShare = (id: string) => {
    console.log('Sharing music with ID:', id);
    // Add your share logic here
    // Example: shareTrack(id) or openShareModal(id)
  }; 
const handleTriggerSearch =  () => {
   setTriggerSearch(true);
}
const handleSearchTrigggerd = () => {
   setTriggerSearch(false);
}
 
 useEffect(() => {
  document.body.className = theme === 'dark' ? 'dark bg-gray-900' : 'light bg-gray-100';

 }, [theme]);

 useEffect(() =>{
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme); 
 } , [])
 useEffect(() => {
     const auth = getAuth();
      const getuserData = onAuthStateChanged(auth , async (user) => {
        if(user){
         const userRef = doc(db, 'users' , user.uid);
         try{
           const nameData = await getDoc(userRef);
           if(nameData.exists()){
           const photo = nameData.data().profilePic;
           setphoto(photo);
           }else{
             console.log(`No profile picture found`);
           }
         } catch(error){
          console.error('Error fetching user data:' , error);
         } finally{
           setloading(false);
         }
        } else{
         console.warn('No user is signed in');
         setloading(false);
        }
        getuserData();
      });
     return () =>  getuserData();
      }, []);
  return(
   <>
<div className={` overflow-hidden flex min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'}`}>
   <aside className="overflow-y-auto">
      {/* {sidebarExpanded ? 'w-64' : 'w-16'} */}
           <Sidebar theme={theme} activeTab={activeTab}
           onSearchTrigger={handleTriggerSearch} 
             
           />     
           <BottomBar theme={theme} activeTab={activeTab} onTabChange={setActiveTab} onSearchTrigger={handleTriggerSearch}/>
    </aside> 
     <main className="flex-1 overflow-y-auto md:ml-12 transition-all duration-300">
        <div className="max-w-4xl mx-auto p-4 md:p-8 overflow-x-hidden"> 
          <div className="flex gap-50 lg:justify-between">
         <SearchBar theme={theme} triggerSearch={triggerSearch} onSearchTriggered={handleSearchTrigggerd}/> 
         <div className="flex gap-1 md:gap-0">
              <Themetoggle theme={theme} onThemeChange={(newTheme) => setTheme(newTheme)}></Themetoggle> 
        <div className="md:ml-16"> {/* User Profile */}
         {
            loading ? (
                <div className='bg-black/10 border border-white/10 rounded-full animate-pulse'></div>
            ) : (
               <img src={photo} alt="Profile photo"  className='w-10 h-10 rounded-full'/>
            )
         }
       </div> {/* User Profile end */}
         </div>
    
   
       </div>
    
        </div> {/* Navbar end */}
       
       <div className="flex-1">
     <MusicGrid items={musicItems} /* isExpanded={true}  */onPlay={handlePlay}
       onLike={handleLike}
       onShare={handleShare}
       theme={theme}
        />
       </div> {/* Display div end */}
     </main>
      </div> {/*  End Container End */}
      <div className="flex-1">
         <Outlet/>
      </div>
   </>
  );
}

{/* Main layout end */}
