import "./Signup.css";
import Title1 from "../title/title";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reEnterPassword, setReEnterPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function
    
    const goLogin = () => {
        navigate('/'); // Navigate to the Sign Up page when the button is clicked
    };
    

    const handleSignup = async (e) => {
        e.preventDefault();
    
        if (password !== reEnterPassword) {
          setError('Passwords do not match');
          return;
        }

        if (password=="" ||reEnterPassword==""||email=="") {
            setError("please fill the detail properly");
            return;
          }

    
        setError('');
    
        try {
          const response = await axios.post('https://moneytracker-pm69.onrender.com/signup', { email, password });
          console.log("hello");
          if (response.data.success) {
            setIsOtpSent(true);
          }
        } catch (err) {
            console.log(err);
          setError("error in otp sending or email already exist");
        }
    };
      // Handle OTP verification
    const handleOtpVerification = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('https://moneytracker-pm69.onrender.com/verify', { email, otp,password});
          
          if (response.data.success) {
            setSuccessMessage('Signup successful!');
            setError('');
            // Redirect to homepage (or another page)
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          } else {
            setError('Invalid OTP. Please try again.');
          }
        } catch (err) {
          setError('Error verifying OTP. Please try again.');
        }
    };
    return(
        <>
            <div className="container-fluid my-5 ">
                <div className="row d-flex flex-column flex-md-row">
                    <div className="col"></div>
                    <div className="col col-md-5">
                    {!isOtpSent ? (
                        <form className="d-flex flex-column bg-primary border border-3 border-dark rounded">
                            <label className="form-label fs-1 text-center my-3 fw-bold">Welcome to  <Title1 color="white" weights="bold"/></label>
                            <label className="form-label fs-1  fw-bold ms-5 lightcolorsign">Enter Email :</label>
                            <input type="email" className="form-control  w-75 ms-5 " id="email-signup" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"></input>
                            <label className="form-label fs-1 fw-bold mt-3 ms-5 lightcolorsign">Enter Password :</label>
                            <input type="password" className="form-control ms-5 w-75 mb-1" id="password-signup" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></input>
                            <label className="form-label fs-1 fw-bold mt-3 ms-5 lightcolorsign">Re-Enter Password :</label>
                            <input type="password" className="form-control ms-5 w-75 mb-4" id="password-signup-confirm" value={reEnterPassword} onChange={(e) => setReEnterPassword(e.target.value)} placeholder="Re-Enter Password"></input>                       
                
                            <div className="row mb-5">
                                <div className="col"></div>
                                <div className="col">
                                    <button onClick={goLogin} className="btn btn btn-dark fw-bold">Login</button>
                                </div>
                                <div className="col">
                                    <button onClick={handleSignup}  className="btn btn btn-dark fw-bold">Sign Up</button>
                                </div>
                                <div className="col"></div>
                                <div className="row mt-5 ms-1 display-5"> {error && <p className="row text-dark fw-bold ms-5 lightcolorsign">{error}</p>}</div>
                            </div>
                        </form>):(
                        <form className="d-flex flex-column bg-primary border border-3 border-dark rounded">
                            <label className="form-label fs-1 text-center my-3 fw-bold">Welcome to  <Title1 color="white" weights="bold"/></label>
                            <label className="form-label fs-1  fw-bold ms-5 lightcolorsign">Enter Otp :</label>
                            <input type="text" className="form-control  w-75 ms-5 " id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter Otp"></input>
                
                            <div className="row mb-5">
                            <div className="col"></div>
                                <div className="col">
                                    <button onClick={handleOtpVerification} className="btn btn btn-dark fw-bold mt-3">Submit</button>
                                </div>
                                <div className="col"></div>
                            </div>
                            <div className="row fs-3 "> {error && <p className="row text-dark fw-bold ms-5 lightcolorsign">{error}</p>}</div>
                            <div className="row fs-3">{successMessage && <p className="row text-success fw-bold ms-5 lightcolorsign">{successMessage}</p>}</div>
                        </form>)}
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </>
    );
}
