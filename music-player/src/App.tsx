import { Routes,Route } from 'react-router-dom';
import Entrance from './Entrance';
import MusicApp from './MusicApp';
import Redirect from './Redirect';
/* import AuthApp from './AuthPage'; */
function App() {

 
  return (
 <>
 <Routes>
  <Route path='/' element={<Redirect/>} />
    <Route path='/intro' element={<Entrance/>}/>
    {/* <Route path='/auth' element={<AuthApp/>}/> */}
    <Route path='/Main' element={<MusicApp/>}/>
 </Routes>
 </>
  );
}

export default App;
/* sm:text-5xl lg:text-7xl */ 
/* dark:bg-gray-900  */
/* bg-white */
  {/*  */}