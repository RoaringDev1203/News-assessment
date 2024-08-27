import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {

    const navigate = useNavigate();
    const authorization = localStorage.getItem('userToken');

    useEffect(()=>{
        if(!authorization){
        navigate('/signin')
        }

    },[navigate, authorization])

    return (
         children 
    )
}

export default ProtectedRoutes