import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = ()=>{
    // Post the File to Backend
    const [pdf,setPdf] = useState(null);
    const { user_id } = useContext(AuthContext);
    
    let navigate = useNavigate();

    const handleFileChange = (event) => {
        setPdf(event.target.files[0]);
    };

    const uplaodPDF = async ()=>{
        if(!pdf){
            alert("Please select the file");
        }else{
            try{
                toast("File Uploading",{
                    position: toast.POSITION.TOP_CENTER,
                });
                const formData = new FormData();
                formData.append("pdf_name",pdf.name)
                formData.append("pdf", pdf);
                formData.append("user_id",user_id);

                const data = await fetch(`http://localhost:8000/api/upload/`,{method:"POST",body:formData});
                const response = await data.json();
                
                if(response.status == "ok"){
                    const id = response.convo_id;
                    navigate("/"+id);
                }
            }catch(err){
                console.log("Error Uploading the File ",err)
            }
        }
    }
    return (
        <>
            <div className="bg-green-500 h-full flex justify-center items-center rounded-[30px] border-4 border-black m-10">
                <div className="m-5">
                    <h1 className="m-5 text-2xl">Upload Your PDF</h1>
                    <input onChange={handleFileChange} className=" bg-orange-600 rounded-[30px] border-4 border-black my-5 mx-5 p-10 text-xl file:border-black file:border-4 file:rounded-[20px] file:drop-shadow-[2px_2px_0px_black]" type="file"></input>
                    <button onClick={uplaodPDF} className="bg-[#fb72a9] rounded-[30px] border-4 border-black mx-5 p-5 text-xl hover:drop-shadow-[4px_4px_0px_black] hover:-translate-x-2 hover:-translate-y-1 duration-200">Upload</button>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Upload;