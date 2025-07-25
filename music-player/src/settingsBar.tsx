import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Music } from 'lucide-react';

interface BottomBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onSearchTrigger?: () => void; 
  theme: string;
}

const SettingsBar: React.FC<BottomBarProps> = ({
  activeTab: propActiveTab,
  onTabChange,
  onSearchTrigger,
  theme = 'dark'
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState('settings');

   const navigate = useNavigate();
  const activeTab = propActiveTab || internalActiveTab;
  
  const handleHomeClick = () => {
    setInternalActiveTab('home');
    if (onTabChange) {
      onTabChange('home');
    }
    navigate('/Main')
  };

  const handleSearchClick = () => {
    setInternalActiveTab('search');
    if (onTabChange) {
      onTabChange('search');
    }
  
    if (onSearchTrigger) {
      onSearchTrigger();
    }
   
  };

  const handleLibraryClick = () => {
    setInternalActiveTab('playlist');
    if (onTabChange) {
      onTabChange('playlist');
    }
     navigate('/library')
  };
 
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
          onClick={handleLibraryClick}
          className={`
            flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg
            transition-all duration-200 ease-in-out
            ${activeTab === 'library' 
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
              ${activeTab === 'library' ? 'scale-110' : 'scale-100'}
            `}
          />
          <span className={`
            text-xs font-medium
            ${activeTab === 'library' ? 'text-blue-400' : 'text-gray-500'}
          `}>
            Library
          </span>
        </button>
      
      </div>
    </div>
  );
};

export default SettingsBar;