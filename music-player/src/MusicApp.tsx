import SearchBar from "./SearchBar";
import BottomBar from "./Bottombar";
import Sidebar from "./sidebar";
import Themetoggle from "./Themetoggle";
import { useEffect, useState } from "react";
 import MusicGrid  from "./musicGrid";
 import { Outlet } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
/* import MusicPlayer from "./MusicCard"; */
import { db } from "./firebase";
export default function MusicApp() {
const [theme ,  setTheme] = useState('dark');
const [triggerSearch , setTriggerSearch] = useState(false);
const [activeTab , setActiveTab] = useState('home');
const [photo ,  setphoto] = useState('');
const [loading , setloading] = useState(true);
const [searchTerm , setSearchTerm] = useState('');
  const [token , setAccessToken] = useState<string|null>(null) ;


  

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

     const handleSearch = async (query:string) => {
      try {
        const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist` , {
          headers :{
            'Authorization' : `Bearer ${token}`
          },
        });
         setSearchTerm(query);
        const data = await res.json();
        console.log(data.artists?.items[0].name);
      } catch (error) {
        console.log('Error Fetching Tracks', error);
      }
   
    };
   const handleSearchResults = async (e:React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter'){
         await handleSearch(searchTerm);
      }
   }
  return (
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
         <SearchBar theme={theme} triggerSearch={triggerSearch} onSearchTriggered={handleSearchTrigggerd} 
         onKeyDown={handleSearchResults}
         /> 
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
       
        <div>
     <MusicGrid 
       theme={theme}
        />    
      {/* <div className="absolute top-0">
     <MusicPlayer/>
      </div> */}
       </div>          {/* Display div end */}
   

     </main>
      </div> {/*  End Container End */}
       <div className="flex-1">
         <Outlet/>
      </div> 
   </>
  );
}
{/* Main layout end */}





