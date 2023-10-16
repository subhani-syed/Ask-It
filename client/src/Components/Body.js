import {Link} from "react-router-dom";
import { useContext,useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";

const Body = () =>{

    const {user_id} = useContext(AuthContext)
    const [convo,setConvo] = useState([]);

    useEffect(()=>{
        getConversations();
    },[]);
    
    const getConversations = async () =>{
        
        const formData = new FormData();
        formData.append("user_id",user_id);

        const response  = await fetch("http://localhost:8000/api/home/",{method:'POST',body:formData})
        const data = await response.json();
        
        data.forEach(element => {
            console.log(element.convo_name)
        });
        setConvo(data);
    }

    const listItems = convo.map(element=>{
        return (<li key={element.id} className="bg-[#FFFF00] rounded-[30px] border-4 border-black my-5 mx-5 p-10 text-xl hover:drop-shadow-[4px_4px_0px_black] hover:-translate-x-2 hover:-translate-y-1 duration-200 ">
            <Link to={element.convo_id}>{element.convo_name}</Link>
        </li>);
    });

    return (<>
        <div className="m-5">
            <div>
                <h2 className="m-5 text-3xl">Your Conversations</h2>
                <button className="bg-[#fb72a9] rounded-[30px] border-4 border-black mx-5 p-5 text-xl hover:drop-shadow-[4px_4px_0px_black] hover:-translate-x-2 hover:-translate-y-1 duration-200 "><Link to={'/upload'}>Create Convo</Link></button>
                { !convo && <h1>No Conversations</h1>}
                <ul>
                    {listItems}
                </ul>
            </div>
        </div>
    </>);
};

export default Body;