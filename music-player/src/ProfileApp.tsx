import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  {
     name : 'Eminem',
    image: "../public/images/eminem.jpeg"
  },
  {
     name : 'Rihanna',
    image: "../public/images/✧_ ┊rihanna.jpeg"
  },
  {
     name : 'Taylor Swift',
    image: "../public/images/Taylor Swift.jpeg"
  },
  {
     name : 'Kendrick Lamer',
    image: "../public/images/ken.jpeg"
  },
  {
     name : 'Shakira',
    image: "../public/images/SHAKIRA Allure.jpeg"
  },
  {
     name : 'Dua Lipa',
    image: "../public/images/lipa.jpeg"
  },
  {
     name : 'Juice Wrld',
    image: "../public/images/juice.png"
  },
  {
     name : 'Don omar',
    image: "../public/images/omar.jpeg"
  },
  {
     name : 'Neymar Jr',
    image: "../public/images/ney.jpeg"
  },
]
const genres = [
  'Afrobeats', 'Hip Hop' , 'R&B' , 'Amapiano' , 'Pop', 'Soul' , 'Jazz' , 'Gospel'
];


export default function ProfileApp (){
  const [selectedArtist , setSelectedArtists] = useState<string[]>([]);
  const [genre, setgenre] = useState('');
  const [profilePic , setProfilepic] = useState<string | null>(null);
  const navigate =  useNavigate()

  const handleArtistClick = (name: string) => {
    setSelectedArtists((prev) => {
      if (prev.includes(name)) {
        return prev.filter((a) => a !== name);
      } else if(prev.length < 3){
        return [...prev, name];
      }  
      return prev;
    });
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file){
      const reader = new FileReader();
      reader.onloadend = () => setProfilepic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if(selectedArtist.length !== 3 || !genre || !profilePic){
      alert('Please complete your profile (3 artists, a genre , and picture).');
      return;
    }
     localStorage.setItem('userProfile' , JSON.stringify({
    artist : selectedArtist,
    genre,
    profilePic,
  }));

  navigate('/Main')
  }
 return(
  <>
  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
   <motion.h1
   className="text-3xl font-bold mb-4"
   initial={{y : -20, opacity:0}}
   animate={{y: 0 , opacity : 1}}
   >
     Complete Profile
   </motion.h1>
    {/* upload picture */}
    <div className="mb-6 text-center">
      <label 
      className="block mb-2 text-sm"
      >Upload Profile Picture</label>
      <input type="file"
       accept="image/*"
       onChange={handleImageUpload}
       className="mx-5"
       />
       {profilePic && (
        <img src={profilePic} alt="Preview" className="w-24 h-24 rounded-full mt-3 " />
       )}
    </div> {/* 1st container end */}
    {/* selectedArtist */}
    <div className="mb-6 text-center">
     <p className="mb-2 text-sm">Pick Your Top 3 Artists</p>
     <div className="flex gap-4 flex-wrap justify-center">
      {artist.map((artist) => (
        <div 
        key={artist.name}
        className={`rounded-lg overflow-hidden border-4 cursor-pointer transition ${selectedArtist.includes(artist.name) 
          ? "border-green-500" : "border-gray-700"}`}
          onClick={() => handleArtistClick(artist.name)}
        >
       <img src={artist.image} alt={artist.name} className="w-24 h-24 object-cover"/>
       <p className="text-xs text-centre mt-1">{artist.name}</p>
        </div>
      ))}
     </div>
    </div> {/* 2nd container end */}
   {/*  select genre */}
   <div className="mb-6 text-center">
    <label className="block mb-2 text-sm">Select Your favourite genre</label>
    <select value={genre} onChange={(e) =>{
      setgenre(e.target.value)
    }} className="bg-black border border-gray-600 px-4 py-2 rounded text-white ">
      <option value="">-- Select Genre --</option>
      {genres.map((g) => (
        <option key={g} value={g}>{g}</option>
      ))}
    </select>
   
   
   </div> {/* 3rd  container end */}
 {/*  save button */}
    <motion.button
    whileTap={{scale: 0.95}}
    onClick={handleSave}
    className="bg-green-600 px-6 py-2 rounded-lg font-semibold"
    >
     Enter App
    </motion.button>
  </div> {/* Main container end */}
  </>
 )
}  /* function end */