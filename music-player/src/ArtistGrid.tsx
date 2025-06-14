  import { useEffect } from 'react';
   import AOS from 'aos';
    import 'aos/dist/aos.css';
const artist = [
  {
    name : 'Ice-spice',
    image: "../public/images/ice.jpeg"
  },
  {
     name : 'Davido',
    image: "../public/images/davido.jpeg"
  },
  {
     name : 'Withney',
    image: "../public/images/Whitney Houston.jpeg"
  },
  {
     name : 'Drake',
    image: "../public/images/drake.jpeg"
  },
  {
     name : 'Micheal Jackson',
    image: "../public/images/mj.jpeg"
  },
  {
     name : 'Dave',
    image: "../public/images/santandave.jpeg"
  },
  {
     name : 'Lil wayne',
    image: "../public/images/lil.jpeg"
  },
  {
     name : 'Central Cee',
    image: "../public/images/ᴄᴇɴᴄʜ.jpeg"
  },
  {
     name : 'Rema',
    image: "../public/images/Rema.jpeg"
  },
  {
     name : 'Justin Bieber',
    image: "../public/images/download (10).jpeg"
  },
  {
     name : 'Wizkid',
    image: "../public/images/Wizkid.jpeg"
  },
  {
     name : 'Nemmz',
    image: "../public/images/nemzzz_.jpeg"
  },
]
const ArtistGrid = () =>{
   useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
   return(
    <>
     <div className="min-h-screen bg-black flex items-center justify-center p-8" data-aos='fade-up'>
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {artist.map((artist,index) => (
            <div
            key={index}
            className="bg-[#111] p-4 rounded-2xl shadow-[0_0_20px_#000] hover:shadow-[0_0_25px_#0ff] transition-all duration-300 hover:scale-105"
            >
               <img src={artist.image} alt={artist.name}
               className="h-24 w-24 object-contain rounded-full mx-auto mb-2"
                 />
            </div>
          ))}
       </div>
     </div> {/*  container end  */}
    </>
   )
}

export default ArtistGrid;