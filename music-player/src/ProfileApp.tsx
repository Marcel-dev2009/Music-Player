import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SwitchCamera } from 'lucide-react';
import { db } from '../src/firebase'
import {auth} from '../src/firebase'
import { ArrowLeftRight } from 'lucide-react';
import { Trash } from 'lucide-react';
import { setDoc, doc } from "firebase/firestore";
 import iceSpice from '@/assets/images/ice.jpeg';
 import whitneyHouston from '@/assets/images/Whitney Houston.jpeg';
 import davido from '@/assets/images/davido.jpeg';
 import drake from '@/assets/images/drake.jpeg'; 
  import michaelJackson from '@/assets/images/mj.jpeg';
 import dave from '@/assets/images/santandave.jpeg';
  import lilWayne from '@/assets/images/lil.jpeg';
  import centralCee from '@/assets/images/cench.jpeg';
   import justinBieber from '@/assets/images/justin.jpeg';
   import wizkid from '@/assets/images/Wizkid.jpeg';
 import nemmz from '@/assets/images/nemzzz.jpeg';
   import eminem from '@/assets/images/eminem.jpeg';
   import anna from '@/assets/images/anna.jpeg';
  import taylor from '@/assets/images/taylor.jpeg';
  import ken from '@/assets/images/ken.jpeg';
  import shakira from '@/assets/images/shakira.jpeg';
  import lipa from '@/assets/images/lipa.jpeg';
   import wrld from '@/assets/images/juice.png';
  import omar from '@/assets/images/omar.jpeg';
  import leo from '@/assets/images/leo.jpeg';
   import mars from '@/assets/images/mars.jpeg'

const artists = [
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
    image: drake
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
    image:  centralCee
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
  {
     name : 'Eminem',
    image: eminem
  },
  {
     name : 'Rihanna',
    image: anna
  },
  {
     name : 'Taylor Swift',
    image: taylor
  },
  {
     name : 'Bruno Mars',
     image : mars
  },
  {
     name : 'Kendrick Lamer',
    image: ken
  },
  {
     name : 'Shakira',
    image: shakira
  },
  {
     name : 'Dua Lipa',
    image: lipa
  },
  {
     name : 'Juice Wrld',
    image: wrld
  },
  {
     name : 'Don omar',
    image: omar
  },
  {
     name : 'Leo Stay_trill',
    image: leo
  },
]
const genre = [
  'Afrobeats',
  'Hip Hop',
  'R&B',
  'Amapiano',
  'Pop',
  'Soul',
  'Jazz',
  'Gospel'
];


export default function ProfileApp (){
  const [artist , setArtists] = useState<string[]>([]);
  const [genreChoice, setgenreChoice] = useState<string[]>([]);
  const [profilePic , setProfilepic] = useState< File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null); 
  const [ username , setUsername ] = useState('')
  const navigate =  useNavigate()

   
 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files && e.target.files[0];
  if(file){
    const imageRef = URL.createObjectURL(file);
    setProfilePicPreview(imageRef);
    setProfilepic(file);
  }
 }
 

 const toggleArtist = (artistName:string) => {
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
const fileInputRef = useRef<HTMLInputElement>(null);

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
     const user = auth.currentUser;
      if(!user) throw new Error('No User is Signed In. ');

      let profilePicUrl = '';

      if(profilePic){
        try{
            const formData = new FormData();
          formData.append('file', profilePic);
          formData.append('upload_preset', 'user_profile_photos');
          const cloudinaryResponse  = await fetch('https://api.cloudinary.com/v1_1/dfsrso3jk/image/upload',{
            method: 'POST',
            body: formData,
          });

          if(!cloudinaryResponse.ok) {
          throw new Error(`Failed to upload image to Cloudinary ${cloudinaryResponse.status}`);
          
         }
            const data = await cloudinaryResponse.json();
          profilePicUrl = data.secure_url;
        } 
        catch (error) {
          console.error('Error uploading profile picture:', error);
          alert('Failed to upload profile picture. Please try again.');
          return;
        }
      }
        
      const userDocRef = doc(db , 'users' , user.uid);
      await setDoc(userDocRef, {
        uid : user.uid,
        profilePic : profilePicUrl || '', 
        name : username,
        genre : genreChoice,
        topArtists : artist,
        createdAt: new Date().toISOString(),
      }); 

      alert(`Profile Created and saved sucessfully`)
      navigate('/Main')
    }

    catch (error){
     if (error instanceof Error) {
       console.error('Error saving profile', error.message);
     } else {
       console.error('Error saving profile', error);
     }
    }
 }  /* main function end */

   const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const deleteProfilePic = () => {
    setProfilepic(null);
    localStorage.removeItem('profilePic')};
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
      placeholder="Enter your username"
      
      value={username}
      onChange={(e) => {
        setUsername(e.target.value)

      }} className="w-full p-2 border rounded "  required />
     </div>  {/* 1st container end */}
     <div>
       <label className="block mb-1"> Profile Picture</label>
        <div>
              <div className=" w-32 h-32 rounded-full overflow-hidden border mx-22 lg:mx-46 ">
         {profilePic ? (
            <img src={profilePicPreview || undefined} alt="Profile" className="w-full h-full object-cover" loading="lazy"/>
         ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
           <button
           type="button"
           className="cursor-pointer"
           onClick={triggerFileInput}
           >
              <SwitchCamera/>  
           </button>
          </div>
         )};
       </div> 
        <div>
        <button className="delete-button cursor-pointer" type="button"
       title="Delete Profile Picture"
       onClick={deleteProfilePic}
       >
            <Trash/>
       </button>
        <button className="cursor-pointer change-button " type="button"
        title="Change Profile Picture"
        onClick={triggerFileInput}
        >
           <ArrowLeftRight/>
        </button>
        </div> {/* Functional button end */}

        </div> {/* end */}
       <input 
       ref={fileInputRef}
        type="file"
       accept="image/*"
       onChange={handleImageUpload}
       className="mt-2 hidden "
        /> {/*   modify */}

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
             <img src={a.image} alt={a.name} className="rounded-full"/>
             <p className="text-center text-sm mt-1">{a.name}</p>
            </div>
          ))}
      </div>
     </div>{/*  3rd div end */}
     <div>
          <p className="mb-1 font-semibold"> Favourite genre </p>
         
          <div className="flex flex-wrap gap-3 ">
            <select name="genre" className="bg-gray-800 text-white p-2 rounded w-full text-center font-bold ">
            <option value="" >Select Genre</option>
              {genre.map((g) => (
                <option  className="bg-black"
                key={g} 
                value={g}
                onClick={() => setgenreChoice([g])}
                >
                  {g}
                </option>
              ))}
            </select>
          </div>
     </div> {/* 4th div */}

     <button
      type="submit"
      className="bg-gray-700 hover:bg-blue-700  text-white py-2 px-4 rounded w-full mt-4 cursor-pointer"
      onClick={handleSubmit}
     >
      Save Profile
     </button>
   </form>
   </>

 )
}  /* function end */

