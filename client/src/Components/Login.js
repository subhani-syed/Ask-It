import React, { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { Link } from "react-router-dom";

const Login = ()=>{
    let {loginUser} = useContext(AuthContext);
    return (

        <div className="bg-[#7b4397] h-screen flex justify-center items-center">
            <div className="bg-white my-10 w-1/2 rounded-[30px] p-10 drop-shadow-[30px_30px_0px_rgba(0,0,0,0.4)]">
                <h4 className="text-center text-3xl text-[#7b4397] font-bold">LOG IN</h4>
                <div className="flex justify-center items-center">
                    <div className="w-full mx-10">
                        <form onSubmit={loginUser}>
                            <label className="text-xl font-bold">Name</label>
                            <br></br>
                            <input className="w-full bg-white rounded my-2 p-2 border-2 border-black drop-shadow-[4px_4px_0px_black]" type="text" name="username" placeholder="Enter Your Username" />
                            <br></br>
                            <label className="text-xl font-bold">Password</label>
                            <br></br>
                            <input className="w-full bg-white rounded my-2 p-2 border-2 border-black drop-shadow-[4px_4px_0px_black]" type="password" name="password" placeholder="Enter Your Password" />
                            <br></br>
                            <br></br>
                            <input className="bg-[#7b4397] rounded-full w-full border-2 border-black p-5 text-xl hover:drop-shadow-[4px_4px_0px_black] hover:-translate-x-2 hover:-translate-y-1 duration-200" value="LOG IN!" type="submit"/>
                        </form>
                        <br></br>
                        <h2 className="text-xl text-center">Don't have an Account? <Link to="/register" className="font-semibold text-[#7b4397]">Register Here</Link> </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;