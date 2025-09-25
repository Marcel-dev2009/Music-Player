
import React from 'react';
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect , useRef} from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Plus, Volume2, X } from 'lucide-react'
export interface MusicItem {
  id: string;
  title: string;
  artist: string;
  coverImage?: string;
  type: 'playlist' | 'album' | 'artist';
  trackCount?: number;
  isLiked?: boolean; 
  
}
interface Song {
  id: number;
  name: string;
  artist: string;
  url: string;
  duration: number;
  artwork: string | null;
  file?: File; // Store original file for persistence
}

interface PlayerState {
  currentSongId: number | null;
  currentTime: number;
  volume: number;
  isPlaying: boolean;
}

/* interface MusicPlayerProps {} */

type Images ={
  url:string
}
 type Playlist = {
  playlist:string;
  id:string;
  name:string;
  images : Images[]
 }
interface MusicGridProps {
  isExpanded?: boolean;
  theme : string;
  playlists?:Playlist[];
}


const MusicGrid: React.FC<MusicGridProps> = ({
 /*  isExpanded = true, */
  theme = 'dark',
}) => {

  const isDark = theme === 'dark';
 const [userName , setUserName] = useState<string|null>(null);
 const [loading , setloading] = useState(true);
 const [songs, setSongs] = useState<Song[]>(() => {
     // In a real environment, you'd use:
     const saved = localStorage.getItem('music-player-songs');
     return saved ? JSON.parse(saved) : [];
    
   });
   const [currentSong, setCurrentSong] = useState<Song | null>(null);
     const [isPlaying, setIsPlaying] = useState<boolean>(false);
     const [currentTime, setCurrentTime] = useState<number>(() => {
       // In a real environment:
        const saved = localStorage.getItem('music-player-state');
        return saved ? JSON.parse(saved).currentTime || 0 : 0;
     });
     const [duration, setDuration] = useState<number>(0);
     const [volume, setVolume] = useState<number>(() => {
       // In a real environment:
        const saved = localStorage.getItem('music-player-state');
        return saved ? JSON.parse(saved).volume || 1 : 1;
     });
       const audioRef = useRef<HTMLAudioElement>(null);
       const fileInputRef = useRef<HTMLInputElement | null>(null);
       const lastSavedTime = useRef<number>(0);
       const saveSongsToStorage = (songsToSave: Song[]): void => {
        // In a real environment, you'd use:
         const songsData = songsToSave.map(song => ({
           ...song,
           file: undefined // Don't store File objects directly
         }));
         localStorage.setItem('music-player-songs', JSON.stringify(songsData));
      };
      const savePlayerState = (state: Partial<PlayerState>): void => {
        // In a real environment:
         const currentState: PlayerState = {
          currentSongId: currentSong?.id || null,
          currentTime: state.currentTime || currentTime,
           volume: state.volume || volume,
          isPlaying: state.isPlaying !== undefined ? state.isPlaying : isPlaying
         };
         localStorage.setItem('music-player-state', JSON.stringify(currentState));
      };
     useEffect(() => {
       // In a real environment, you'd restore the last playing song and position:
       const savedState = localStorage.getItem('music-player-state');
       if (savedState) {
         const state: PlayerState = JSON.parse(savedState);
         const savedSong = songs.find(song => song.id === state.currentSongId);
         if (savedSong) {
           setCurrentSong(savedSong);
           setCurrentTime(state.currentTime);
           setVolume(state.volume);
           setIsPlaying(false);
         }
       }
     }, [songs]); 
       const handleFileAdd = (event: React.ChangeEvent<HTMLInputElement>): void => {
         const files = Array.from(event.target.files || []);
         
         files.forEach((file: File) => {
           if (file.type.startsWith('audio/')) {
             const audioUrl: string = URL.createObjectURL(file);
             
             // Create audio element to extract metadata
             const audio = new Audio(audioUrl);
             audio.addEventListener('loadedmetadata', () => {
               const newSong: Song = {
                 id: Date.now() + Math.random(),
                 name: file.name.replace(/\.[^/.]+$/, ""),
                 artist: "Unknown Artist",
                 url: audioUrl,
                 duration: audio.duration,
                 artwork: null,
                 file: file // Store original file reference
               };
               
               setSongs((prev: Song[]) => {
                 const updatedSongs = [...prev, newSong];
                 saveSongsToStorage(updatedSongs);
                 return updatedSongs;
               });
             });
           }
         });
         
         event.target.value = '';
       };

       const removeBar = ():void => {
        fileInputRef.current?.remove();
       }
       const playSong = (song: Song): void => {
        if (currentSong?.id === song.id) {
          if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
            savePlayerState({ isPlaying: false });
          } else {
            audioRef.current?.play();
            setIsPlaying(true);
            savePlayerState({ isPlaying: true });
          }
        } else {
          // Different song - load new song
          setCurrentSong(song);
          setIsPlaying(true);
          setCurrentTime(0); // Reset time for new song
          savePlayerState({ 
            currentSongId: song.id, 
            isPlaying: true, 
            currentTime: 0 
          });
        }
      };
      const togglePlayPause = (): void => {
        if (!currentSong) return;
        
        if (isPlaying) {
          audioRef.current?.pause();
          setIsPlaying(false);
          savePlayerState({ isPlaying: false, currentTime });
        } else if(!isPlaying) {
           audioRef.current?.play();
          setIsPlaying(true);
          savePlayerState({ isPlaying: true, currentTime });
        }
      };
    
      const playNext = (): void => {
        if (!currentSong || songs.length === 0) return;
        
        const currentIndex: number = songs.findIndex((song: Song) => song.id === currentSong.id);
        const nextIndex: number = (currentIndex + 1) % songs.length;
        setCurrentSong(songs[nextIndex]);
        setIsPlaying(true);
      };
    
      const playPrevious = (): void => {
        if (!currentSong || songs.length === 0) return;
        
        const currentIndex: number = songs.findIndex((song: Song) => song.id === currentSong.id);
        const prevIndex: number = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
        setCurrentSong(songs[prevIndex]);
        setIsPlaying(true);
      };
    
      const skipForward = (): void => {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.min(
            audioRef.current.currentTime + 10,
            audioRef.current.duration || 0
          );
        }
      };
    
      const skipBackward = (): void => {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
        }
      };
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentSong) return;
    
        const updateTime = (): void => {
          if (audio.currentTime !== undefined) {
            setCurrentTime(audio.currentTime);
            
            // Save position every 5 seconds to avoid excessive localStorage writes
            if (Math.abs(audio.currentTime - lastSavedTime.current) > 5) {
              savePlayerState({ currentTime: audio.currentTime });
              lastSavedTime.current = audio.currentTime;
            }
          }
        };
        
        const updateDuration = (): void => {
          if (audio.duration !== undefined) {
            setDuration(audio.duration);
          }
        };
        
        const handleEnded = (): void => {
          setIsPlaying(false);
          playNext();
        };
    
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);
    
        // Load and play new song, restore saved position if same song
        audio.src = currentSong.url;
        audio.volume = volume;
        
        // Set the saved current time when loading
        const onCanPlay = () => {
          if (currentTime > 0 && currentTime < audio.duration) {
            audio.currentTime = currentTime;
          }
          audio.removeEventListener('canplay', onCanPlay);
          
          if (isPlaying) {
            audio.play().catch((error: Error) => {
              console.error('Error playing audio:', error);
              setIsPlaying(false);
              savePlayerState({ isPlaying: false });
            });
          }
        };
        
        audio.addEventListener('canplay', onCanPlay);
    
        return () => {
          audio.removeEventListener('timeupdate', updateTime);
          audio.removeEventListener('loadedmetadata', updateDuration);
          audio.removeEventListener('ended', handleEnded);
        };
      } ,[currentSong , volume , isPlaying]); // Might add
      useEffect(() => {       
        if (audioRef.current) {
          audioRef.current.volume = volume;
        }
      }, [volume]);
    
      // Format time helper
      const formatTime = (time: number): string => {
        const minutes: number = Math.floor(time / 60);
        const seconds: number = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      };
    
      // Handle volume change
      const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        savePlayerState({ volume: newVolume });
      };
      const handleAddSongsClick = (): void => {
        fileInputRef.current?.click();
      };
    
useEffect(() => { 
  const auth = getAuth();
  const getuserName = onAuthStateChanged(auth , async (user) => {   
 if(user){
   const userRef = doc(db, 'users', user.uid);
   try{
     const userData = await getDoc(userRef);
     if(userData.exists()){
      const name:string = userData.data().name;
      setUserName(name);
      setloading(false);
      return name;
     } else{
      console.log('No user data');
     }
   } catch(error){
    console.error('Error fetching user data:', error);
   }
   /* finally{
    setloading(false);
   } */
 } else{
  console.error('No user is signed in');
  setloading(false);
 }

}); /* AuthstageChanged end */
 return () => getuserName();
}, []);
  return ( 
    <div className={`min-h-screen text-white ${isDark ? 'bg-black' : 'bg-white'} 
    `}>
      {/* Header Section */}
      <div className={` p-6  ${isDark ? 'border border-white/10 rounded-xl bg-linear-65 from-black via-blue-800 to-blue-900': 'border rounded-xl border-black bg-linear-65 from-white to-blue-300 '}`}>
        <h1 className={`text-3xl font-bold  mb-2 ${isDark ? 'text-white' : 'text-black'}`}> 
            {loading ? (
               <div>
                <div className='bg-black/10 border border-white/10 p-2 rounded-full animate-pulse w-16'></div>
                <div className='bg-black/10 border border-white/10 p-2 rounded-full animate-pulse w-26'></div>
               </div>
            ) : (
             <motion.p
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             transition={{ duration: 0.5, delay: 0.2 }}
              >
              {userName ? `Welcome , ${userName}` : 'Welcome to Muse Player'}
             </motion.p>
            )
            }
          </h1>  
        <p className={isDark ? 'text-[#f5f5f5]' : 'text-black'}>Discover and enjoy your favorite tracks</p>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
         <div>{/*  Content Start */}
          <div className={`min-h-screen text-white p-6 ${isDark ? 'bg-black' : 'bg-white'}`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Music Library</h1>
                  
                  {/* Add Songs Button */}
                  <button
                    onClick={handleAddSongsClick}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-400 px-4 py-2 rounded-full transition-colors"
                    type="button"
                  >
                    <Plus size={20} />
                    Add Songs
                  </button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="audio/*"
                    onChange={handleFileAdd}
                    className="hidden"
                  />
                </div>
          
                {/* Songs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                  {songs.map((song: Song) => (
                    <div
                      key={song.id}
                      className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                      onClick={() => playSong(song)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          playSong(song);
                        }
                      }}
                    >
                      {/* Album Art Placeholder */}
                      <div className="aspect-square bg-gray-700 rounded-md mb-3 flex items-center justify-center relative overflow-hidden">
                        {song.artwork ? (
                          <>
                          <img 
                            src={song.artwork} 
                            alt={`${song.name} album art`} 
                            className="w-full h-full object-cover" 
                          />
                          
                          
                          </>
                        ) : (
                          <>
                          <div className="text-4xl" role="img" aria-label="Music note">🎵</div>
                          <div className='absolute top-1 left-[10rem]'>
                            <button onClick={removeBar}>
                              <X/>
                            </button>
                          </div></>
                        )}
                    
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-green-500 rounded-full p-3">
                            {currentSong?.id === song.id && isPlaying ? (
                              <Pause size={24} fill="white" />
                            ) : (
                              <Play size={24} fill="white" className="ml-1" />
                            )}
                          </div>
                        
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-sm mb-1 truncate">{song.name}</h3>
                      <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                    </div>
                  ))}
                  
                  {songs.length === 0 && (
                    <div className="col-span-full text-center text-gray-400 py-20">
                      <p className="text-xl mb-2">No songs added yet</p>
                      <p>Click "Add Songs" to upload your music files</p>
                    </div>
                  )}
                </div>
          
                {/* Audio Element */}
                <audio ref={audioRef} preload="metadata" />
          
                {/* Player Controls */}
                {currentSong && (
                  <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4">
                    <div className="max-w-screen-xl mx-auto">
                      {/* Currently Playing Info */}
                      <div className=" p-2 w -50 flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-700 rounded flex lg:ml-16 items-center justify-center">
                            <span role="img" aria-label="Music note">🎵</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{currentSong.name}</p>
                            <p className="text-gray-400 text-xs">{currentSong.artist}</p>
                          </div>
                        </div>
                        
                        {/* Volume Control */}
                        <div className="flex items-center gap-2">
                          <Volume2 size={20} aria-label="Volume" />
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-20 accent-blue-500"
                            aria-label="Volume control"
                          />
                        </div>
                      </div>
          
                      {/* Progress Bar */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs text-gray-400 w-10">
                          {formatTime(currentTime)}
                        </span>
                        <div className="flex-1 bg-gray-700 h-1 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 transition-all duration-200"
                            style={{
                              width: duration ? `${(currentTime / duration) * 100}%` : '0%'
                            }}
                            role="progressbar"
                            aria-valuenow={currentTime}
                            aria-valuemax={duration}
                            aria-label="Song progress"
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-10">
                          {formatTime(duration)}
                        </span>
                      </div>
          
                      {/* Control Buttons */}
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={playPrevious}
                          className="text-gray-400 hover:text-white transition-colors"
                          type="button"
                          aria-label="Previous song"
                          disabled={songs.length === 0}
                        >
                          <SkipBack size={24} />
                        </button>
                        
                        <button
                          onClick={skipBackward}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                          type="button"
                          aria-label="Skip backward 10 seconds"
                          disabled={!currentSong}
                        >
                          -10s
                        </button>
                        
                        <button
                          onClick={togglePlayPause}
                          className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 transition-colors disabled:opacity-50"
                          type="button"
                          aria-label={isPlaying ? "Pause" : "Play"}
                          disabled={!currentSong}
                        >
                          {isPlaying ? (
                            <Pause size={24} fill="white" />
                          ) : (
                            <Play size={24} fill="white" className="ml-1" />
                          )}
                        </button>
                        
                        <button
                          onClick={skipForward}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                          type="button"
                          aria-label="Skip forward 10 seconds"
                          disabled={!currentSong}
                        >
                          +10s
                        </button>
                        
                        <button
                          onClick={playNext}
                          className="text-gray-400 hover:text-white transition-colors"
                          type="button"
                          aria-label="Next song"
                          disabled={songs.length === 0}
                        >
                          <SkipForward size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
         </div> {/* Content End */}
      </div>
    </div>
  );
};

export default MusicGrid;