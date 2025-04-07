import "./Dstatus.css"
import React from "react";
import { useNavigate } from "react-router-dom";


export default function Dstatus()
{
    const navigate = useNavigate(); 
    const handleLogout = () => {
        navigate("/"); // Navigate to the root ("/")
      };

    return(
        <div className="container-fluid Dstatusmaincontainer">
                <div className="row  align-items-center justify-content-between">
                    <div className="col-6 fs-1 col-md-2 w-md-50 p-1 ms-2" id="Dstatuslogotext">Money Tracker</div>
                    <div className="col-2 col-md-8 w-md-50 d-flex justify-content-end">
                        <button className="btn btn-danger w-80 h-30 my-2 fw-bold" onClick={handleLogout}>Logout</button>
                    </div>  
                </div>
        </div>  
    );
}