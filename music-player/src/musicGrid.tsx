import React from 'react';
import MusicCard from './MusicCard';

export interface MusicItem {
  id: string;
  title: string;
  artist: string;
  coverImage?: string;
  type: 'playlist' | 'album' | 'artist';
  trackCount?: number;
  isLiked?: boolean; 
  
}

interface MusicGridProps {
  items: MusicItem[];
  isExpanded?: boolean;
  onPlay?: (id: string) => void;
  onLike?: (id: string) => void;
  onShare?: (id: string) => void;
  theme : string;
}


const MusicGrid: React.FC<MusicGridProps> = ({
  items,
  isExpanded = true,
  onPlay,
  onLike,
  onShare,
  theme = 'dark'
}) => {
  // Calculate grid columns based on sidebar state
  const isDark = theme === 'dark';
  const getGridCols = () => {    
    if (isExpanded) {
      // Sidebar width: 64 (16rem), more space for cards
      return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
    } else {
      // Sidebar width: 16 (4rem), less space for cards
      return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7';
    }
  };

  return ( 
    <div className={`min-h-screen text-white ${isDark ? 'bg-black' : 'bg-white'} 
    `}>
      {/* Header Section */}
      <div className={` p-6  ${isDark ? 'border border-white/10 rounded-xl bg-gray-800/30': 'border-t border-l border-black bg-white '} `}>
        <h1 className={`text-3xl font-bold  mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Your Music</h1>  
        <p className={isDark ? 'text-gray-400' : 'text-black'}>Discover and enjoy your favorite tracks</p>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Recently Played Section */}
        <section>
          <h2 className={`text-xl font-semibold  mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Recently Played</h2>
          <div className={`grid ${getGridCols()} gap-4`}>
            {items.slice(0, 6).map((item) => (
              <MusicCard
                key={item.id}
                {...item}
                onPlay={onPlay}
                onLike={onLike}
                onShare={onShare}
                theme={theme}
              />
            ))}
          </div>
        </section>

        {/* Made for You Section */}
        <section>
          <h2 className={`text-xl font-semibold  mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Made for You</h2>
          <div className={`grid ${getGridCols()} gap-4`}> 
            {items.slice(6, 12).map((item) => (
              <MusicCard
                key={item.id}
                {...item}
                onPlay={onPlay}
                onLike={onLike}
                onShare={onShare}
                theme={theme}
              />
            ))}
          </div>
        </section>

        {/* Popular Playlists Section */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Popular Playlists</h2>
          <div className={`grid ${getGridCols()}  gap-4`}>
            {items.slice(12).map((item) => (
              <MusicCard
                key={item.id}
                {...item}
                onPlay={onPlay}
                onLike={onLike}
                onShare={onShare}
                theme={theme}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MusicGrid;