import { getStorage , ref , uploadBytes , getDownloadURL } from "firebase/storage";

export const uploadProfileImage = async (file : File, uid : string): Promise<string> => {
   const storage = getStorage();
   const storageRef = ref(storage, `ProfilePictures/${uid}`);

   await uploadBytes(storageRef , file);
   const downloadURL = await getDownloadURL(storageRef);
   return  downloadURL
}