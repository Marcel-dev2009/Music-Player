import {
   ListMusic ,
    DiscAlbum , 
   Library,
   Headset,
   Cog 

} from "lucide-react"
 const artistImages = [
  "../images/davido.jpg",
  "../images/omah.jpg",
  "../images/fireboydml.jpg",
 ]
export default function Sidebar(){
  return(
    <>
    
    <ListMusic/>
    <DiscAlbum/>
    <Library/>
    <Headset/>
    <Cog/> <br />

    <div>
      {
        artistImages.map((src , index) => (
          <img src={src} alt={`Artist ${index + 1}`} key={index} 
          className="w-12 flex flex-col rounded-full mb-2 gap-1.5"
          />
        ))
      }
    </div>
    <div className="w-12 border-1 rounded-full p-2 Person">
   
    </div>
    </>
  )
}