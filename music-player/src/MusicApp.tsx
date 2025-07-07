/* import Themetoggle from "./Themetoggle"; */
 import { Ellipsis } from 'lucide-react';
import Sidebar from './sidebar';
 import logo from '/Static-assets/logo.png';
export default function MusicApp() {
  return(
   <div className='flex gap-8 flex-col absolute bg-gray-950 p-6 rounded-br-4xl rounded-r-4xl h-full scroll-auto overflow-y-auto scroll-style'>
        <div className='flex gap-4'>
             <a href="#" title='Muse Logo'> <img src={logo} alt="Image" style={{width:"1.5rem"}} /></a>
             <a href="#" title='Menu'> <Ellipsis/></a>
        </div>
         <Sidebar/>
       </div>
  );
}

 {/* <Themetoggle/> */}