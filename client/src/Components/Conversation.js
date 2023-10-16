import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Conversation = () =>{
    // Fetch RAG queries
    const [rag,setRag] = useState("");
    const [query,setQuery] = useState("");
    const {convo_id} = useParams();
    const [pdf_name,setPdfName] = useState(null)
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        getPdf();
    },[])

    const handleChange = (e)=>{
        setQuery(e.target.value);
    }
    
    const getPdf = async()=>{
        const formData = new FormData();
        formData.append("convo_id",convo_id);
        const response = await fetch('http://localhost:8000/api/details/',{method:"POST",body:formData});
        const data = await response.json();
        setPdfName(data.convo_name);
    }
    const askQuery = async ()=>{
        if(!query){
            alert("Ask Something..")
        }else{
            try{
                toast("Generating answer...",{
                    position: toast.POSITION.TOP_CENTER,
                });
                const formData = new FormData();
                formData.append("query",query)
                formData.append("convo_id", convo_id);
                const response = await fetch(`http://localhost:8000/api/query/`,{method:"POST",body:formData});
                const data = await response.json();
                setRag(data.result);
                setLoading(false);
            }catch(err){
                console.log("Error Asking the query ",err)
            }
        }
    }

    console.log(convo_id)
    return (
        <div className="bg-[#FFFF00] rounded-[30px] border-4 border-black m-10 p-10 drop-shadow-[4px_4px_0px_black]" >
            <h1 className="text-3xl">Uploaded PDF: {pdf_name}</h1>
            <h2 className="m-1 text-2xl">Ask your PDF</h2>
            <input onChange={handleChange} className="bg-white w-full rounded my-2 p-2" placeholder="Ask your query" />
            <button onClick={askQuery} className="bg-[#fb72a9] rounded-[30px] border-4 border-black my-2 p-5 text-xl hover:drop-shadow-[4px_4px_0px_black] hover:-translate-x-2 hover:-translate-y-1 duration-200">Ask It!!</button>
            { rag && <div>
                <p className="text-xl bg-white rounded m-2 p-2">{rag}</p>
            </div>}
            {loading && (<ToastContainer/>)}
            
        </div>
    )
}

export default Conversation;