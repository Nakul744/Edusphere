import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../services/api";



function Notices(){

  const [notices,setNotices] = useState([]);

  const token = localStorage.getItem("token");

  let role = "";

  if(token){
    try{
      const decoded = jwtDecode(token);
      role = decoded.role;
    }catch{}
  }

  useEffect(()=>{

    fetchNotices();

  },[]);


  const fetchNotices = async () => {

    try{

      const res = await API.get("/notices");

      const sortedNotices = res.data.data.sort(
        (a,b)=> new Date(b.createdAt) - new Date(a.createdAt)
      );

      setNotices(sortedNotices);

    }catch{
      console.log("Error fetching notices");
    }

  };


  const handleDelete = async (id) => {

    if(!window.confirm("Delete this notice?")) return;

    try{

      await API.delete(`/notices/${id}`);

      setNotices(notices.filter(n => n.id !== id));

    }catch{

      alert("Error deleting notice");

    }

  };


  return(

    <div className="min-h-screen flex flex-col bg-gray-100">

     

      <div className="max-w-4xl mx-auto p-8 flex-grow">

        <h1 className="text-3xl font-bold mb-8 text-center">
          📢 Notices
        </h1>

        {notices.length === 0 && (

          <p className="text-center text-gray-500">
            No notices available
          </p>

        )}

        {notices.map((notice)=>(

          <div
            key={notice.id}
            className="bg-white p-6 rounded-xl shadow mb-6 hover:shadow-lg transition"
          >

            <h2 className="text-xl font-semibold mb-1">
              {notice.title}
            </h2>

            <p className="text-gray-500 text-sm mb-3">
              {new Date(notice.createdAt).toLocaleString("en-IN",{
                dateStyle:"medium",
                timeStyle:"short"
              })}
            </p>

            <p className="text-gray-700 mb-4">
              {notice.message}
            </p>

            {/* ADMIN ONLY DELETE BUTTON */}

            {role === "ADMIN" && (

              <button
                onClick={()=>handleDelete(notice.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>

            )}

          </div>

        ))}

      </div>



    </div>

  );

}

export default Notices;