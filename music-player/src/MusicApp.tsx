import SearchBar from "./SearchBar";
import Sidebar from "./sidebar";
export default function MusicApp() {

  return(
   <>
   <div className=" flex overflow-hidden h-screen">
    <aside className="overflow-y-auto">
           <Sidebar/>
    </aside> 
     <main className="flex-1  bg[#f5f5f5] overflow-y-auto mx-23 mt-6 lg:mx-50">
      <SearchBar/>
     </main>
      </div> 
   </>
  );
}

{/* Main layout end */}