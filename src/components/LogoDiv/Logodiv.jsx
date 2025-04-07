import React, { useRef } from "react";
import "./Logodiv.css";

export default function Logodiv({ loginRef })
{
    const scrollToLogin = () => {
        loginRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div className="container-fluid logomaincontainer">
                <div className="row  align-items-center justify-content-between">
                    <div className="col-6 fs-1 col-md-2 w-md-50 p-1 ms-2 " id="logotext">Money Tracker</div>
                    <div className="col-2 col-md-8 w-md-50 d-flex justify-content-end">
                        <button className="btn btn-primary w-80 h-30 my-2 fw-bold"   onClick={scrollToLogin}>Login</button>
                    </div>  
                </div>
            </div>                
        </>
    );
}