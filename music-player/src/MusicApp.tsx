import SearchBar from "./SearchBar";
import Sidebar from "./sidebar";
import Themetoggle from "./Themetoggle";
import { useEffect, useState } from "react";
export default function MusicApp() {
const [theme ,  setTheme] = useState('dark');
 useEffect(() => {
  document.body.className = theme === 'dark' ? 'dark bg-gray-900' : 'light bg-gray-100';
 }, [theme]);

  return(
   <>
<div className={` flex min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'}`}>
   <aside className="overflow-y-auto">
           <Sidebar theme={theme} />
    </aside> 
     <main className="flex-1  overflow-y-auto ml-24 md:ml-64 transition-all duration-300">
        <div className="max-w-4xl mx-auto p-4 md:p-8 ">
          <div className="flex gap-32 lg:justify-between">
         <SearchBar theme={theme}/> 
       <Themetoggle theme={theme} onThemeChange={(newTheme) => setTheme(newTheme)}></Themetoggle>
       </div>
        </div>
     </main>
      </div> {/*  End Container End */}
   </>
  );
}

{/* Main layout end */}