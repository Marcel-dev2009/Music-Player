
  /* interface Props{   
    acessToken? : string;
  } */
  type TrackProps = {
       getTracks : spotifyTrackItems[];
  } 
   type Artist = {
          name: string;
   };

   type spotifyTrackItems = {
          track: {
          id: string;
          name: string;
          artists: Artist[];
          };
   }

 const Tracks = ({getTracks} : TrackProps) => {
/*      const [tracks , setTracks] = useState<spotifyTrackItems[]>([]);
   useEffect(() => {
    const fetchTracks = async () => {
          const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: {
                      Authorization :`Bearer ${acessToken}`,        
                    }
          });
          const data = await res.json();
          setTracks(data.items);
    };
    fetchTracks()
   }, [playlistId , acessToken]); */
   return (
          <>
        {
          getTracks.map((item) => (
           <div
          key={item.track.id}>
         <p>{item.track.name}</p>
         <p>{item.track.artists[0].name}</p>
          </div>        
          ))
        }
          </>
   )
 }
 export default Tracks;