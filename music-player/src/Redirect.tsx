import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Redirect = () => {
   const navigate = useNavigate();

  useEffect(() => {
     const hasVisited = localStorage.getItem('hasVisited');
     const hasAuth = localStorage.getItem('hasAuth');

     if(hasVisited){
    navigate('auth');
  }else{
    localStorage.setItem('hasVisited' , 'true');
    navigate('/intro');
  }
    if(hasAuth){
      navigate('/profile-setup');
    } else {
      localStorage.setItem('hasAuth' , 'true');
      navigate('/sign');
    }
  }, [navigate]);
   
  return null
}



export default Redirect;