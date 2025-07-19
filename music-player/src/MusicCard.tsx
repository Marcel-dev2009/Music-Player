import React from 'react';
import { Play, MoreHorizontal, Music, Heart, Share2 } from 'lucide-react';

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  coverImage?: string;
  type: 'playlist' | 'album' | 'artist';
  trackCount?: number;
  isLiked?: boolean;
  onPlay?: (id: string) => void;
  onLike?: (id: string) => void;
  onShare?: (id: string) => void;
  theme : string
}

const MusicCard: React.FC<MusicCardProps> = ({
  id,
  title,
  artist,
  coverImage,
  type,
  trackCount,
  isLiked = false,
  onPlay,
  onLike,
  onShare,
  theme = 'dark'
}) => {
  const isDark = theme === 'dark';
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay?.(id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(id);
  };

  return (
    <div className={`group relative  rounded-lg p-4  transition-all duration-300 cursor-pointer
      ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-200 border border-gray-800 hover:bg-gray-500'}
    `}>
      {/* Cover Image Container */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-700">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800">
            <Music className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={handlePlay}
            className="w-14 h-14 bg-blue-800 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <Play className="w-6 h-6 ml-1" fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className={` font-semibold text-sm truncate group-hover:text-gray-100 ${isDark ? 'text-white' : 'text-black'}`}>
          {title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-black'}`}>
              {artist}
            </p>
            {trackCount && (
              <p className={` text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-black'}`}>
                {trackCount} {trackCount === 1 ? 'track' : 'tracks'}
              </p>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleLike}
              className={`p-1.5 rounded-full hover:bg-gray-600 transition-colors duration-200 ${
                isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-gray-600 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Share2 className="w-4 h-4" />
            </button>
            
            <button className="p-1.5 rounded-full hover:bg-gray-600 text-gray-400 hover:text-white transition-colors duration-200">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Type Badge */}
        <div className="flex items-center">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 capitalize">
            {type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;