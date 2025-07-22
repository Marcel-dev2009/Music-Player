
import { Routes,Route } from 'react-router-dom';
import Entrance from './Entrance';
import MusicApp from './MusicApp';
import AuthApp from './AuthPage';
/* import Redirect from './Redirect'; */
import SignIn from './signIn';
import ProfileApp from './ProfileApp';
import Settings from './settings';
import Library from './library';
import Like from './like';
import Recently from './Recently';
import Radio from './radio';
import Charts from './Charts';
import Podcast from './Podcast';
function App() {

 
  return (
 <>
 <Routes>
    {/*   <Route path='/' element={<Redirect/>} /> */}
    <Route path='/' element={<Entrance/>}/>
     <Route path='/auth' element={<AuthApp/>}/> 
    <Route path='/sign' element={<SignIn />}/>
    <Route path='/profile-setup' element={<ProfileApp/>}></Route>
    <Route path='/Main' element={<MusicApp/>}/>
      <Route path='/library' element={<Library/>}/>
    <Route path='/settings' element={<Settings/>}/>
    <Route path='/likedSongs' element={<Like/>}/>
    <Route path='/recentlyPlayed' element={<Recently/>}/>
    <Route path='/radio' element={<Radio/>}/>
    <Route path='/podcast' element={<Podcast/>}/>
    <Route path='charts' element={<Charts/>}/>
  </Routes>
 </>
  );
}

export default App;
