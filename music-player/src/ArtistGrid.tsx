  import { useEffect } from 'react';
 import AOS from 'aos';
  import 'aos/dist/aos.css';

    import iceSpice from './assets/images/ice.jpeg';
    import davido from './assets/images/davido.jpeg';
    import whitneyHouston from './assets/images/Whitney Houston.jpeg';
    import drake from './assets/images/drake.jpeg'; 
    import michaelJackson from './assets/images/mj.jpeg';
    import dave from './assets/images/santandave.jpeg';
    import lilWayne from './assets/images/lil.jpeg';
    import centralCee from './assets/images/cench.jpeg';
    import rema from 'src/assets/images/rema.jpeg'; 
    import justinBieber from './assets/images/justin.jpeg';
    import wizkid from './assets/images/Wizkid.jpeg';
    import nemmz from './assets/images/nemzzz.jpeg';

const artist = [
  {
    name : 'Ice-spice',
    image: iceSpice
  },
  {
     name : 'Davido',
    image: davido
  },
  {
     name : 'Withney',
    image:  whitneyHouston
  },
  {
     name : 'Drake',
    image:  drake
  },
  {
     name : 'Micheal Jackson',
    image: michaelJackson
  },
  {
     name : 'Dave',
    image: dave
  },
  {
     name : 'Lil wayne',
    image: lilWayne
  },
  {
     name : 'Central Cee',
    image: centralCee
  },
  {
     name : 'Rema',
    image: rema
  },
  {
     name : 'Justin Bieber',
    image: justinBieber
  },
  {
     name : 'Wizkid',
    image: wizkid
  },
  {
     name : 'Nemmz',
    image: nemmz
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