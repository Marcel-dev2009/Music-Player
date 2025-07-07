/* import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited){
      navigate('/auth')
    } else{
      localStorage.setItem('hasVisited', 'true')
      navigate('/intro')
    }
  }, [navigate]);
  return null
};

export default Redirect */