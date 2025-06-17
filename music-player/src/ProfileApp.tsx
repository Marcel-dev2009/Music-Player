import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SwitchCamera } from 'lucide-react';
const artists = [
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
  const [artist , setArtists] = useState<string[]>([]);
  const [genre, setgenre] = useState<string[]>([]);
  const [profilePic , setProfilepic] = useState<string | null>(null);
  const [ username , setUsername ] = useState('')
  const navigate =  useNavigate()

   
 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files && e.target.files[0];
  if(file){
    const imageUrl = URL.createObjectURL(file);
    setProfilepic(imageUrl);
  }
 } 
 const toggleArtist = (artistName: string) => {
    setArtists((prev) => {
      if(prev.includes(artistName)) {
        return prev.filter((name) => name !== artistName);
      } else if (prev.length < 3 ){
        return [...prev , artistName];
      } else {
         return prev
      }
    })
 };
 const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
   const options = Array.from(e.target.selectedOptions as HTMLCollectionOf<HTMLOptionElement>, (option: HTMLOptionElement) => option.value);
   setgenre(options);
 }
 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!username || genre || artist.length !== 3 ){
      alert('Please Complete all fields including selecting 3 artists');
      return
    }
    localStorage.setItem('userProfile' , JSON.stringify(
      {
        username,
        profilePic,
        artist,
        genre
      }
    ));
    alert('Profile created sucessfully!');
    navigate('/Main')
 }
 return(
   <>
   <form onSubmit={handleSubmit} className="
   p-4 
   max-w-lg
   mx-auto
   space-y-4
   ">
     <h2 className="text-2xl font-bold">Complete Your Profile</h2>
     <div>
     <label className="block text-sm font-medium">Username</label>
     <input type="text"
      value={username}
      onChange={(e) => {
        setUsername(e.target.value)

      }} className="w-full p-2 border rounded "  required />
     </div>  {/* 1st container end */}
     <div>
       <label className="block mb-1"> Profile Picture</label>
       <div className="relative w-24 h-24 rounded-full overflow-hidden border">
         {profilePic ? (
          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
         ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
           <SwitchCamera/>
          </div>
         )}
       </div>
       <input type="file"
       accept="image/*"
       onChange={handleImageUpload}
       className="mt-2"
        />
     </div> {/* 2nd container end */}
     <div>
      <p className="mb-1 font-semibold">Select Your Top 3 Artist</p>
      <div className="grid grid-cols-3 gap-2">
          {artists.map((a) => (
            <div
            key={a.name}
            onClick={() => toggleArtist(a.name)}
            className={`cursor-pointer border-2 rounded p-1 ${
              artist.includes(a.name) ? 'border-blue-600' : 'border-transparent'
             }`}
             >
             <img src={a.image} alt={a.name} className="rounded"/>
             <p className="text-center text-sm mt-1">{a.name}</p>
            </div>
          ))}
      </div>
     </div>{/*  3rd div end */}
     <div>
          <p className="mb-1 font-semibold"> Favourite genre</p>
          <div className="flex flex-wrap gap-3">
            {genres.map((genre) => (
              <label 
              key={genre}
              className="flex items-center gap-2"
              >
                <input type="radio"
                name={genre}
                value={genre}
                checked={genre.includes(genre)}
                onChange={() => setgenre([genre])}
                 />
                 {genre}
              </label>
            ))}
          </div>
     </div> {/* 4th div */}
     <button
      type="submit"
      className="bg-gray-700 hover:bg-blue-700 w-24 text-white py-2 px-4 rounded w-full mt-4"
     >
      Save Profile
     </button>
   </form>
   </>
 )
}  /* function end */