import React from "react"
import "./index.css";

export default function Themetoggle() {
  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
   if(e.target.checked){
    document.querySelector('body')?.setAttribute('data-theme', 'dark');
     }
     else{
    document.querySelector('body')?.setAttribute('data-theme', 'light');
     }
  }
  return(
   <>
     <div className="wrapper">
              <label className="switch">
                <input type="checkbox" onChange={toggleTheme}/>
                <span className="slider round"></span>
              </label>
     </div>
   </>
  );
}