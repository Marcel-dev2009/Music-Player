import { Routes,Route } from 'react-router-dom';
import Entrance from './Entrance';
import MusicApp from './MusicApp';
import AuthApp from './AuthPage';
import Redirect from './Redirect';
import SignIn from './signIn';
import ProfileApp from './ProfileApp';
function App() {

 
  return (
 <>
 <Routes>
     <Route path='/' element={<Redirect/>} />
    <Route path='/intro' element={<Entrance/>}/>
     <Route path='/auth' element={<AuthApp/>}/> 
    <Route path='/sign' element={<SignIn />}/>
    <Route path='/profile-setup' element={<ProfileApp/>}></Route>
    <Route path='/Main' element={<MusicApp/>}/>
  </Routes>
 </>
  );
}

export default App;
