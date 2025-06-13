import { doc , serverTimestamp, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../src/firebase'
import {auth} from '../src/firebase'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {

   const navigate = useNavigate();
  const sendToSignIN = () => {
    navigate('/sign');
  };
  
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [displayName , setDisplayName] = useState('');
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  try{
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email,
     password
    );
    const user = userCredential.user;
    await setDoc(doc(db , 'users', user.uid), {
      name : displayName,
      email : user.email,
      createdAt : serverTimestamp(),
    });
    console.log('User Created and saved to firestore');
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unknown error occurred.');
    }
  } finally{
    setLoading(false);
  }
} /* async end */

return(
   <>
   
    <div className='min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white'>
      <form onSubmit={handleSignUp}
       className='space-y-4 bg-[#1a1a1a] p-8 rounded-lg shadow-lg'
      >
         <h2 className='text-xl font-bold'>Sign Up</h2>
         <input type="text" placeholder='Name' value={displayName} onChange={(e) =>{
          setDisplayName(e.target.value)
         }} className='w-full p-2 rounded bg-[#2a2a2a] border border-gray-600' required/> {/* first input end */}
         <input type="email" placeholder='Email' value={email} onChange={(e) => {
           setEmail(e.target.value)
         }}  className='w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 ' required/> {/* second input end */}

         <input type="password" placeholder='password' value={password} onChange={(e) => {
          setPassword(e.target.value)
         }} className='w-full p-2 rounded bg-[#2a2a2a] border border-gray-600'  required /> {/* third input end */}
         {error && <p className='text-red-500'>{error}</p>}

        <div>
           <button type='submit' className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 disabled:opacity-50 w-full' disabled={loading}>
           {loading ? 'Signing Up....' : 'Sign Up'}
         </button>
           <pre className='text-gray-600 mt-3'>
             Already have account...? <span onClick={sendToSignIN} className='text-gray-400 animate-pulse cursor-pointer'> Sign in</span>
           </pre>
        </div>
           
      </form>{/*  first form end */}
    </div> {/* first div end */}
   </>
)
}


export default AuthPage;

  