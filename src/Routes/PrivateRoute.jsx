import React, { use } from 'react'
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {

    const { user, loading } = use(AuthContext);

    const location = useLocation();
    console.log(location)


    if (loading){
        return <span class="loading loading-dots loading-md"></span>

    }
    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to='/login'></Navigate>
}

export default PrivateRoute;
