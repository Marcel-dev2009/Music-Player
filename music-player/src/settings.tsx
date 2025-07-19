 import SearchBar from "./SearchBar";
import SettingsBar from "./settingsBar";
import MusicSidebar from "./sidebar";
import ThemeToggle from "./Themetoggle";
import { useEffect, useState } from "react";
export default function Settings(){
const [theme , setTheme] = useState('dark')
  const [triggerSearch , setTriggerSearch] = useState(false);
  const handleTriggerSearch =  () => {
   setTriggerSearch(true);
}
const handleSearchTrigggerd = () => {
   setTriggerSearch(false);
}
 useEffect(() => {
   document.body.className = theme === 'dark' ? 'dark bg-black' : 'light bg-white';
 }, [theme]);
 useEffect(() => {
   const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      const html = document.documentElement;
      html.classList.add(savedTheme);
      html.classList.remove(savedTheme === 'dark' ? 'light' : 'dark');
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
 }, []);
  return (
  <>
  <div className={` flex min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
     <aside>
       <MusicSidebar theme={theme} onSearchTrigger={handleTriggerSearch}/>
       <SettingsBar theme={theme} onSearchTrigger={handleTriggerSearch}/>
     </aside>
      
      <main className="flex-1 overflow-y-auto md:ml-64 transition-all duration-300">
          <div className=" flex gap-60 md:justify-between p-4 ">
        <SearchBar triggerSearch={triggerSearch} onSearchTriggered={handleSearchTrigggerd} theme={theme}/>
        <ThemeToggle theme={theme} onThemeChange={(newTheme) => setTheme(newTheme)} />
       </div>
      </main>
      
  </div>
  </>
  )
}
