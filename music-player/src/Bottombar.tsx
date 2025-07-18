import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Music , Settings} from 'lucide-react';

interface BottomBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onSearchTrigger?: () => void; // Add this prop
  theme: string;
}

const BottomBar: React.FC<BottomBarProps> = ({
  activeTab: propActiveTab,
  onTabChange,
  onSearchTrigger, // Add this
  theme = 'dark'
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState('home');
   const navigate = useNavigate();
  // Use prop if provided, otherwise use internal state
  const activeTab = propActiveTab || internalActiveTab;
  
  const handleHomeClick = () => {
    setInternalActiveTab('home');
    if (onTabChange) {
      onTabChange('home');
    }
    // Add home-specific logic here
  };

  const handleSearchClick = () => {
    setInternalActiveTab('search');
    if (onTabChange) {
      onTabChange('search');
    }
    // Trigger the search bar
    if (onSearchTrigger) {
      onSearchTrigger();
    }
    // Add search-specific logic here
  };

  const handlePlaylistClick = () => {
    setInternalActiveTab('playlist');
    if (onTabChange) {
      onTabChange('playlist');
    }
    // Add playlist-specific logic here
  };
 const handleSettingsClick = () => {
   setInternalActiveTab('settings');
   if(onTabChange){
    onTabChange('settings')
   }
    navigate('/settings');
 }
  const isDark = theme === 'dark';
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 border-t border-gray-700 md:hidden z-50 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
      <div className="flex items-center justify-around h-16 px-4">
        
        {/* Home Button */}
        <button
          onClick={handleHomeClick}
          className={`
            flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg
            transition-all duration-200 ease-in-out
            ${activeTab === 'home' 
              ? 'text-blue-400 bg-blue-400/10' 
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }
            active:scale-95
          `}
        >
          <Home 
            size={20} 
            className={`
              transition-all duration-200
              ${activeTab === 'home' ? 'scale-110' : 'scale-100'}
            `}
          />
          <span className={`
            text-xs font-medium
            ${activeTab === 'home' ? 'text-blue-400' : 'text-gray-500'}
          `}>
            Home
          </span>
        </button>

        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          className={`
            flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg
            transition-all duration-200 ease-in-out
            ${activeTab === 'search' 
              ? 'text-blue-400 bg-blue-400/10' 
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }
            active:scale-95
          `}
        >
          <Search 
            size={20} 
            className={`
              transition-all duration-200
              ${activeTab === 'search' ? 'scale-110' : 'scale-100'}
            `}
          />
          <span className={`
            text-xs font-medium
            ${activeTab === 'search' ? 'text-blue-400' : 'text-gray-500'}
          `}>
            Search
          </span>
        </button>

        {/* Playlist Button */}
        <button
          onClick={handlePlaylistClick}
          className={`
            flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg
            transition-all duration-200 ease-in-out
            ${activeTab === 'playlist' 
              ? 'text-blue-400 bg-blue-400/10' 
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }
            active:scale-95
          `}
        >
          <Music 
            size={20} 
            className={`
              transition-all duration-200
              ${activeTab === 'playlist' ? 'scale-110' : 'scale-100'}
            `}
          />
          <span className={`
            text-xs font-medium
            ${activeTab === 'playlist' ? 'text-blue-400' : 'text-gray-500'}
          `}>
            Playlist
          </span>
        </button>
       {/*  Settings  */}
      <button
      onClick={handleSettingsClick}
      className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg
            transition-all duration-200 ease-in-out
            ${activeTab === 'settings' 
              ? 'text-blue-400 bg-blue-400/10' 
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }
            active:scale-95`}
      >
      <Settings
      size={20}
      className={` transition-all duration-200
              ${activeTab === 'settings' ? 'scale-110' : 'scale-100'}`}
      />
      <span
      className={`text-xs font-medium
            ${activeTab === 'settings' ? 'text-blue-400' : 'text-gray-500'}`}>
         Settings
      </span>
      </button>
      </div>
    </div>
  );
};

export default BottomBar;