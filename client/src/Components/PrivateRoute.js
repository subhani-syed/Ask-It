import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if (user == null) {
            navigate('/login');
        }
    },[])
    
    console.log("Private Route");
    
    return user ? children : null;
};

export default PrivateRoute;
