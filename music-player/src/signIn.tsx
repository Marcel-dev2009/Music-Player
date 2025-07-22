import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../src/firebase'
import { useNavigate } from "react-router-dom";
import Logo from "./logo";
const SignIn = () => {
 const navigate = useNavigate();
 const [email , setEmail] = useState('');
 const [password ,  setPassword] = useState('');
 const [error ,  setError] = useState('');
 const handleSignIn = async (e:React.FormEvent) => {
  e.preventDefault();
  setError('');
    console.log('🔄 Attempting sign in with:', email); // Add this
  try{
   const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
     console.log('✅ Sign in successful:', userCredential.user.uid)
    navigate('/profile-setup')
  } catch (err: unknown) {
     console.error('❌ Sign in failed:', err)
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unknown error occurred');
    }
  }
    
 } /* async end */


  return (
     <>
     <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
       <form
       onSubmit={handleSignIn}
       className=" p-8 rounded-xl shadow-xl w-full max-w-md lg:bg-[#1a1a1a]"
       >
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <Logo/>
        <div className="mb-4">
        <label className="block text-sm mb-1">
          Email
        </label> {/* 1st label end */}
        <input type="email"
        className="w-full p-2 rounded bg-[#2a2a2a] focus:outline-none"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }} required
         />
        </div> {/* 2nd contaier end */}
        <div className="mb-6">
       <label className="block text-sm mb-1">
           Password
       </label> {/* 2nd label end */}
        <input type="password"
        className="w-full p-2 rounded bg-[#2a2a2a] focus:outline-none"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }} required
         />
        </div>{/*  3rd container end */}
        {error && <p className="text-red-500">{error}</p>}

        <button
        type="submit"
        className="w-full py-2 bg-blue-600 rounded hover:blue-700 transition"
        >
         Sign In
        </button>
        <p className="mt-4 text-sm text-center">
          Don't Have an account? {""}
          <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate('/auth')}>
            Sign Up
          </span>
        </p>
       </form> {/* form end */}
     </div>{/*  container end */}
     </>
  )
}

export default SignIn