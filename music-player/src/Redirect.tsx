import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Redirect = () => {
   const navigate = useNavigate();

  useEffect(() => {
     const hasVisited = localStorage.getItem('hasVisited');
      if(hasVisited){
    navigate('auth');
  }else{
    localStorage.setItem('hasVisited' , 'true');
    navigate('/intro');
  }
  }, [navigate]);
  return null
}



export default Redirect;