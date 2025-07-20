/* import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
  
useEffect(() => { 
  const auth = getAuth();
   const getuserName = onAuthStateChanged(auth , async (user) => {
   
 if(user){
   try{
  const  userRef = doc(db,  'users', user.uid);
    const userDoc = await getDoc(userRef);
    if(userDoc.exists()){
      const userName = userDoc.data().name;
      return userName;
    } else{
      console.log('No user data found');
      return null;
    }
   } catch(error){
    console.error("Error fetching user name:", error);
    return null;
   }
 } else{
   console.warn("No user is currently signed in.");
   return null;
 }
})
  return () => getuserName();
}, []);
 */