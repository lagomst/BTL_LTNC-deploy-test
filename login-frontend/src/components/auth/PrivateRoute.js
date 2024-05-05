import { useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom'

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('jwtToken');
  const info = sessionStorage.getItem('userdata');

  const path = window.location.pathname.split('/');
  const loginUrl = '/' + path[1] + '/login';
  useEffect(() => {    
    if(!token){
      navigate(loginUrl, {replace: true });
    }
    else{
      const userdata = JSON.parse(info);
      if(path[1] != userdata.role){
        navigate('/' + userdata.role + '/dashboard');
      }
    }
  }, []);
  return(
    <Outlet/>
  )
}

export default PrivateRoutes