import { Link, useNavigate } from "react-router-dom";

const Register = ()=>{
    const navigate = useNavigate();

    const registerUser = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("uname",e.target.username.value);
        formData.append("mail",e.target.email.value);
        formData.append("pwd",e.target.password.value);
        const response = await fetch('http://localhost:8000/api/register/',{method:'POST',body:formData});
        if(response.status == 200){
            alert("User Registered, you can login")
            navigate('/login');
        }else{
            alert("Something went wrong");
        }
    }
    return (
        <div className="bg-[#7b4397] h-screen flex justify-center items-center">
            <div className="bg-white my-10 w-1/2 rounded-[30px] p-10 drop-shadow-[30px_30px_0px_rgba(0,0,0,0.4)]">
                <h4 className="text-center text-3xl text-[#7b4397] font-bold">SIGN UP</h4>
                <div className="flex justify-center items-center">
                    <div className="w-full mx-10">
                        <form onSubmit={registerUser}>
                            <label className="text-xl font-bold">Name</label>
                            <br></br>
                            <input className="w-full bg-white rounded my-2 p-2 border-2 border-black drop-shadow-[4px_4px_0px_black]" type="text" name="username" placeholder="Enter Your Username" />
                            <br></br>
                            <label className="text-xl font-bold">Email</label>
                            <br></br>
                            <input className="w-full bg-white rounded my-2 p-2 border-2 border-black drop-shadow-[4px_4px_0px_black]" type="email" name="email" placeholder="Enter Your email" />
                            <br></br>
                            <label className="text-xl font-bold">Password</label>
                            <br></br>
                            <input className="w-full bg-white rounded my-2 p-2 border-2 border-black drop-shadow-[4px_4px_0px_black]" type="password" name="password" placeholder="Enter Your Password" />
                            <br></br>
                            <br></br>
                            <input className="bg-[#7b4397] rounded-full w-full border-2 border-black p-5 text-xl hover:drop-shadow-[4px_4px_0px_black] hover:-translate-x-2 hover:-translate-y-1 duration-200" value="SIGN UP!" type="submit"/>
                        </form>
                        <br></br>
                        <h2 className="text-xl text-center">Have an Account? <Link to="/login" className="font-semibold text-[#7b4397]">Login Here</Link> </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;