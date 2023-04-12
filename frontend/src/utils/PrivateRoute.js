import React from "react";
import HomePage from "../pages/HomePage";
import { getLocal } from "../helpers/auth";
import jwt_decode from "jwt-decode"
import AdminPanelPage from "../pages/AdminPanel";
import LoginPage from "../pages/LoginPage";
import { useNavigate } from "react-router-dom";


const PrivateRoute = ({children, ...rest}) => {
    const response = getLocal('authToken');
    // let {user} = useSelector((state) => state.auth)
    const history = useNavigate()
    console.log(response);
    if (response){
        const decoded = jwt_decode(response)

        if (decoded.is_admin){
            console.log('admin');
            return <AdminPanelPage/>
        } 
        else if (!decoded.is_admin ){
            return <HomePage/>
        }
    }
    else{
        console.log('no token');
        return <LoginPage/>
        // history('/login')
    }
    // console.log('decoded',decoded);
    

    
    

    

    // console.log('private', user);
    // const authenticated = user;

    // return response ? <HomePage/> :<Navigate to="/login" />;
    // return(
    //     <Route {...rest}>{!authenticated ? <Navigate to='/login'/> : children}</Route>
    // )
}

export default PrivateRoute;