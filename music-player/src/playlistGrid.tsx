import { Outlet } from 'react-router-dom';
type Playlist = {
  playlist:string;
  id : string;
  name : string;
  images :Images[];
}
type Images = {
  url :string
}

interface PlaylistProps {
  playlists: Playlist[] ;
  onSelect: (playlist: Playlist | null)  => void;
}

const Playlist = ({playlists, onSelect}: PlaylistProps) => {
  return(
     <>
       <div className="grid grod-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {
        playlists.map((playlist:Playlist) => (
           <div key={playlist.id} onClick={() => onSelect(playlist)} className="bg-white rounded p-4"> {/* Might be id */}
          <h3>{playlist.name}</h3>
          <img src={playlist.images[0]?.url} alt={playlist.name} width={150} className={`w-full rounded mb-2      
            `} />
           </div>
        ))            
          }
      </div>  
      <div className="flex-1">
          <Outlet/>
      </div>
      </>  
  )
}
export default Playlist;