import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [authTokens,setAuthTokens] = useState(localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user,setUser] = useState(localStorage.getItem('authTokens')?jwt_decode(localStorage.getItem('authTokens')) : null);
    const navigate = useNavigate();

    const loginUser = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("username",e.target.username.value);
        formData.append("password",e.target.password.value);
        const login_response = await fetch("http://localhost:8000/api/login/",{method:'POST',body:formData});
        const login_data = await login_response.json();

        if(login_data.status == "ok"){
            const response = await fetch("http://localhost:8000/api/token/",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    'username':e.target.username.value,
                    'password':e.target.password.value
                })
            })
            const data = await response.json();
            if(response.status == 200){
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens',JSON.stringify(data))
                navigate('/');
            }
        }else{
            alert("Something went wrong");
        }
        
    }


    
    const contextData = {
        loginUser:loginUser,
        user:user,
        authTokens:authTokens,
        user_id:user?.user_id,
    }

    return (<AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>)
}