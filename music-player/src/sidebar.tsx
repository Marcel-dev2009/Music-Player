import { useState, useEffect } from 'react';
import logo from '/Static-assets/logo.png'
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
  Menu,
  X,
  Ellipsis
} from 'lucide-react';


export default function MusicSidebar({theme = 'dark'}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
  }, [lastScrollY]);
  const isDark = theme === 'dark';
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Search' },
    { icon: Library, label: 'Your Library' },
    { icon: Heart, label: 'Liked Songs' },
    { icon: PlayCircle, label: 'Recently Played' },
    { icon: Radio, label: 'Radio' },
    { icon: Mic2, label: 'Podcasts' },
    { icon: TrendingUp, label: 'Charts' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen">
      {/* Fixed Sidebar */}
      <div className={` inline-block fixed top-0 left-0 h-screen bg-[#111] border-r border-slate-900 transition-all duration-300 ease-in-out z-40 ${
        isExpanded ? 'w-64' : 'w-16'
      } ${isVisible ? '-translate-x-0' : '-translate-x-full'}
      ${
       isDark 
                ? 'text-gray-300 hover:text-white' 
                : 'text-black hover:text-gray-900 bg-[#F5F5F5]'
                          
      }
    
      `}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className={`flex items-center space-x-3 ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src={logo} alt="Muse-Logo" className={`w-6`}/>
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
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative group">
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-gray-300  hover:text-white ${!isExpanded ? 'justify-center' : ''}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" color={isDark ? '#fff' : '#000'} />
                  <span className={`${
                    isExpanded ? 'opacity-100' : 'opacity-0 w-0'
                  } transition-all duration-300 overflow-hidden whitespace-nowrap
                  ${isDark ? 'text-gray-100' : 'text-black'}
                  `}>
                    {item.label}
                  </span>
                </button>
                
                {/* Tooltip for collapsed state */}
                {!isExpanded && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-gray-700">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
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
        {!isExpanded && isVisible && (
          <button
            onClick={() => setIsExpanded(true)}
            className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors border border-slate-600 shadow-lg"
          >
            <Ellipsis className="w-4 h-4 text-gray-300" />
          </button>
        )}

        {/* Show button when sidebar is hidden */}
        {!isVisible && (
          <button
            onClick={() => setIsVisible(true)}
            className="fixed left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-all duration-300 border border-slate-600 shadow-lg z-50"
          >
            <Menu className="w-5 h-5 text-gray-300" />
          </button>
        )}
      </div>
    </div>
  );
}
     {/*   */}