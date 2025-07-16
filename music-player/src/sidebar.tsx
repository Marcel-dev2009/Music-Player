import { useState} from 'react';
import logo from '/Static-assets/logo.png'
import {useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search,
  Library, 
  Heart, 
  PlayCircle, 
  Radio, 
  Mic2, 
  TrendingUp, 
  Settings, 
  X,
  Ellipsis
} from 'lucide-react';

 interface SideSearchProps{
   activeTab?: string;
    onSearchTrigger?: () => void;
    theme : string;
     expanded?: boolean;  // Add this
    onToggle?: () => void;  // Add this
}
export default function MusicSidebar({theme = 'dark',
  onSearchTrigger, /* expanded = true, onToggle */
} : SideSearchProps) {
  const [isExpanded, setIsExpanded] = useState(true);
 /*  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0); */
/* 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show sidebar when scrolling down, hide when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
      
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]); */

  const isDark = theme === 'dark';
 const navigate = useNavigate();
  // Individual menu item handlers
  const handleHomeClick = () => {
    navigate('/Main')
  };

  const handleSearchClick = () => {
     if(onSearchTrigger){
      onSearchTrigger()
     }
  };

  const handleLibraryClick = () => {
    console.log('Library clicked');
    // Add library navigation
  };

  const handleLikedSongsClick = () => {
    console.log('Liked Songs clicked');
    // Add liked songs navigation
  };

  const handleRecentlyPlayedClick = () => {
    console.log('Recently Played clicked');
    // Add recently played navigation
  };

  const handleRadioClick = () => {
    console.log('Radio clicked');
    // Add radio functionality
  };

  const handlePodcastsClick = () => {
    console.log('Podcasts clicked');
    // Add podcasts navigation
  };

  const handleChartsClick = () => {
    console.log('Charts clicked');
    // Add charts navigation
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
    // Add settings modal/navigation
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Sidebar */}
      <div className={` hidden md:inline-block fixed top-0 left-0 h-screen bg-[#111] border-r border-slate-900 transition-all duration-300 ease-in-out z-40 ${
        isExpanded ? 'w-64' : 'w-16'
      } 
      ${
       isDark 
                ? 'text-gray-300 hover:text-white' 
                : 'text-black hover:text-gray-900 bg-[#F5F5F5]'
                          
      }
    
      `}>
        
        {/* Header */}
        <div className=" flex items-center justify-between p-4 border-b border-slate-700">
          <div className={`flex items-center space-x-3 ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src={logo} alt="Muse-Logo" className={`w-6 ${isDark ? 'bg-transparent': 'bg-gray-950 p-0.5 rounded-sm'}`}/>
            </div>
            <h1 className={`font-bold text-sm whitespace-nowrap lg:text-lg
            ${
               isDark 
                ? ' text-white hover:text-white' 
                : 'text-black hover:text-gray-900'
            }
             active:scale-95 focus:outline-none
            `}
            >Muse Player</h1>
          </div>
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className={`p-2 rounded-lg  transition-colors text-gray-300 hover:text-white ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
            >
              <X className='w-5 h-5' color={isDark ? '#fff' : '#000'}/>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {/* Home */}
          <div className="relative group">
            <button
              onClick={handleHomeClick}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-300  hover:text-white ${!isExpanded ? 'justify-center' : 'hover:bg-gray-700'} `}
            >
              <Home className="w-5 h-5 flex-shrink-0" color={isDark ? '#fff' : '#000'} />
              <span className={`${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              } transition-all duration-300 overflow-hidden whitespace-nowrap
              ${isDark ? 'text-gray-100' : 'text-black'}
              `}>
                Home
              </span>
            </button> 
            {!isExpanded && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                Home
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative group">
            <button
              onClick={handleSearchClick}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-300  hover:text-white ${!isExpanded ? 'justify-center' : 'hover:bg-gray-700'} `}
            >
               <Search className="w-5 h-5 flex-shrink-0" color={isDark ? '#fff' : '#000'} />
              <span className={`${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              } transition-all duration-300 overflow-hidden whitespace-nowrap
              ${isDark ? 'text-gray-100' : 'text-black'}
              `}>
                Search
              </span>
            </button> 
            {!isExpanded && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                Search
              </div>
            )}
          </div>

          {/* Your Library */}
          <div className="relative group">
            <button
              onClick={handleLibraryClick}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-300  hover:text-white ${!isExpanded ? 'justify-center' : 'hover:bg-gray-700'} `}
            >
              <Library className="w-5 h-5 flex-shrink-0" color={isDark ? '#fff' : '#000'} />
              <span className={`${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              } transition-all duration-300 overflow-hidden whitespace-nowrap
              ${isDark ? 'text-gray-100' : 'text-black'}
              `}>
                Your Library
              </span>
            </button> 
            {!isExpanded && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                Your Library
              </div>
            )}
          </div>

          {/* Liked Songs */}
          <div className="relative group">
            <button
              onClick={handleLikedSongsClick}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-300  hover:text-white ${!isExpanded ? 'justify-center' : 'hover:bg-gray-700'} `}
            >
              <Heart className="w-5 h-5 flex-shrink-0" color={isDark ? '#fff' : '#000'} />
              <span className={`${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              } transition-all duration-300 overflow-hidden whitespace-nowrap
              ${isDark ? 'text-gray-100' : 'text-black'}
              `}>
                Liked Songs
              </span>
            </button> 
            {!isExpanded && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                Liked Songs
              </div>
            )}
          </div>

          {/* Recently Played */}
          <div className="relative group">
            <button
              onClick={handleRecentlyPlayedClick}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-300  hover:text-white ${!isExpanded ? 'justify-center' : 'hover:bg-gray-700'} `}
            >
              <PlayCircle className="w-5 h-5 flex-shrink-0" color={isDark ? '#fff' : '#000'} />
              <span className={`${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              } transition-all duration-300 overflow-hidden whitespace-nowrap
              ${isDark ? 'text-gray-100' : 'text-black'}
              `}>
                Recently Played
              </span>
            </button> 
            {!isExpanded && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                Recently Played
              </div>
            )}
          </div>

          {/* Radio */}
          <div className="relative group">
            <button
              onClick={handleRadioClick}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-300  hover:text-white ${!isExpanded ? 'justify-center' : 'hover:bg-gray-700'} `}
            >
              <Radio className="w-5 h-5 flex-shrink-0" color={isDark ? '#fff' : '#000'} />
              <span className={`${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              } transition-all duration-300 overflow-hidden whitespace-nowrap
              ${isDark ? 'text-gray-100' : 'text-black'}
              `}>
                Radio
              </span>
            </button> 
            {!isExpanded && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                Radio
              </div>
            )}
          </div>

          {/* Podcasts */}
          <div className="relative group">
            <button
              onClick={handlePodcastsClick}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-300  hover:text-white ${!isExpanded ? 'justify-center' : 'hover:bg-gray-700'} `}
            >
              <Mic2 className="w-5 h-5 flex-shrink-0" color={isDark ? '#fff' : '#000'} />
              <span className={`${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              } transition-all duration-300 overflow-hidden whitespace-nowrap
              ${isDark ? 'text-gray-100' : 'text-black'}
              `}>
                Podcasts
              </span>
            </button> 
            {!isExpanded && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                Podcasts
              </div>
            )}
          </div>

          {/* Charts */}
          <div className="relative group">
            <button
              onClick={handleChartsClick}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-300  hover:text-white ${!isExpanded ? 'justify-center' : 'hover:bg-gray-700'} `}
            >
              <TrendingUp className="w-5 h-5 flex-shrink-0" color={isDark ? '#fff' : '#000'} />
              <span className={`${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              } transition-all duration-300 overflow-hidden whitespace-nowrap
              ${isDark ? 'text-gray-100' : 'text-black'}
              `}>
                Charts
              </span>
            </button> 
            {!isExpanded && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                Charts
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative group">
            <button
              onClick={handleSettingsClick}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-300  hover:text-white ${!isExpanded ? 'justify-center' : ''} hover:bg-gray-700`}
            >
              <Settings className="w-5 h-5 flex-shrink-0" color={isDark ? '#fff' : '#000'} />
              <span className={`${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              } transition-all duration-300 overflow-hidden whitespace-nowrap
              ${isDark ? 'text-gray-100' : 'text-black'}
              `}>
                Settings
              </span>
            </button> 
            {!isExpanded && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                Settings
              </div>
            )}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 absolute-profile right-0 p-4 border-t border-slate-700">
          <div className={`flex items-center space-x-3 ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className={` text-sm font-medium  ${isDark ? 'text-gray-100' : 'text-black'}`}>John Doe</p>
              <p className={`text-xs  ${isDark ? 'text-gray-100' : 'text-black'}`}>Premium User</p>
            </div>
          </div>
        </div>

        {/* Expand Button - positioned on the right side when collapsed */}
     
          <button
            onClick={() => setIsExpanded(true)
              
            }
            className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors border border-slate-600 shadow-lg"
          >
            <Ellipsis className="w-4 h-4 text-gray-300" />
          </button>
       

        {/* Show button when sidebar is hidden */}
      </div>
    </div>
  );
}