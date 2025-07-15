import SearchBar from "./SearchBar";
import BottomBar from "./Bottombar";
import Sidebar from "./sidebar";
import Themetoggle from "./Themetoggle";
import { useEffect, useState } from "react";
export default function MusicApp() {
const [theme ,  setTheme] = useState('dark');
const [triggerSearch , setTriggerSearch] = useState(false);
const [activeTab , setActiveTab] = useState('home');
const handleTriggerSearch =  () => {
   setTriggerSearch(true);
}
const handleSearchTrigggerd = () => {
   setTriggerSearch(false);
}
 useEffect(() => {
  document.body.className = theme === 'dark' ? 'dark bg-gray-900' : 'light bg-gray-100';
 }, [theme]);

  return(
   <>
<div className={` flex min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'}`}>
   <aside className="overflow-y-auto">
           <Sidebar theme={theme} />
           <BottomBar theme={theme} activeTab={activeTab} onTabChange={setActiveTab} onSearchTrigger={handleTriggerSearch}/>
    </aside> 
     <main className="flex-1  overflow-y-auto md:ml-64 transition-all duration-300">
        <div className="max-w-4xl mx-auto p-4 md:p-8 overflow-x-hidden ">
          <div className="flex gap-60 lg:justify-between">
         <SearchBar theme={theme} triggerSearch={triggerSearch} onSearchTriggered={handleSearchTrigggerd}/> 
       <Themetoggle theme={theme} onThemeChange={(newTheme) => setTheme(newTheme)}></Themetoggle>
       </div>
        </div>
     </main>
    
      </div> {/*  End Container End */}
   </>
  );
}

{/* Main layout end */}