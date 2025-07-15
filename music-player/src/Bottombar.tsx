import React, { useState } from 'react';
import { Home, Search, Music } from 'lucide-react';

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
  
  // Use prop if provided, otherwise use internal state
  const activeTab = propActiveTab || internalActiveTab;
  
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
    },
    {
      id: 'playlist',
      label: 'Playlist',
      icon: Music,
    },
  ];

  const handleTabClick = (tabId: string) => {
    // Update internal state
    setInternalActiveTab(tabId);
    
    // Call parent's onTabChange if provided
    if (onTabChange) {
      onTabChange(tabId);
    }
    
    // If search tab is clicked, trigger the search bar
    if (tabId === 'search' && onSearchTrigger) {
      onSearchTrigger();
    }
  };

  const isDark = theme === 'dark';
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 border-t border-gray-700 md:hidden z-50 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`
                flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg
                transition-all duration-200 ease-in-out
                ${isActive 
                  ? 'text-blue-400 bg-blue-400/10' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }
                active:scale-95
              `}
            >
              <IconComponent 
                size={20} 
                className={`
                  transition-all duration-200
                  ${isActive ? 'scale-110' : 'scale-100'}
                `}
              />
              <span className={`
                text-xs font-medium
                ${isActive ? 'text-blue-400' : 'text-gray-500'}
              `}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomBar;