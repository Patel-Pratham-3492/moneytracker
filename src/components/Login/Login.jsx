import { forwardRef } from "react";
import "./Login.css";
import Title1 from "../title/title";
import React from "react";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function Login(props, ref)
{
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);  // To control visibility of the alert
    const [opacity, setOpacity] = useState(1);
    const [message , setMessage] = useState("");
    const [userCounts, setUserCounts] = useState([]);

    const navigate = useNavigate(); // Initialize the navigate function

    const goToSignUp = () => {
        navigate('/SignUpPage'); // Navigate to the Sign Up page when the button is clicked
    };

    const goToDashboard = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        
        // Send POST request with email and password to the backend
        try {
          const response = await fetch('https://moneytracker-pm69.onrender.com/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Send email and password
          });
    
          if (!response.ok) {
            throw new Error('Login failed');
          }
          else{
            const data = await response.json(); // Assuming the backend returns a response with a token or success message
            localStorage.setItem('userEmail', email);
            navigate('/Dashboard');
          }
        } catch (error) {
          console.error('Error:', error);
          showAlertMessage();
          setMessage('Login failed. Please check your credentials.');
        }
      };
    


    const data = {
        labels: userCounts.months,
        datasets: [
            {
                label: "Users per Month",
                data: userCounts.userCount,
                backgroundColor: "black", // Bootstrap primary color (blue)
                borderColor: "rgba(255, 255, 255, 1)", // White border
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { labels: { color: "#fff" } }, // White legend text
            title: { display: true, text: "User Growth Per Month", color: "#fff" }, // White title
        },
        scales: {
            x: { ticks: { color: "white" }, grid: { color: "rgba(255, 255, 255, 0.42)" } }, // White X-axis text & grid
            y: { ticks: { color: "white",callback: function(value) {return Number.isInteger(value) ? value : '';}, }, grid: { color: "rgba(255, 255, 255, 0.2)" } }, // White Y-axis text & grid
        },
    };


    const showAlertMessage = () => {
        setShowAlert(true);
        setOpacity(1);  // Reset opacity to 1 (fully visible)
    
        // Set a timeout to start fading out after 2 seconds
        setTimeout(() => {
          let fadeOutInterval = setInterval(() => {
            setOpacity((prevOpacity) => {
              if (prevOpacity <= 0) {
                clearInterval(fadeOutInterval); // Stop the fade-out effect when opacity reaches 0
                setShowAlert(false);            // Hide the alert after it fades out
                return 0;
              }
              return prevOpacity - 0.1;       // Decrease opacity by 0.1
            });
          }, 300);  // Change opacity every 200ms
        }, 1000); // Wait for 2 seconds before starting the fade-out
      };
    


      useEffect(() => {
        // Fetch the aggregated user count data from the backend
        axios
          .get("https://moneytracker-pm69.onrender.com/user-count-per-month")
          .then((response) => {
            setUserCounts(response.data); // Store the response data in state
          })
          .catch((error) => {
            console.error("Error fetching user counts:", error);
          });
      }, []);

    return(
        <>
            <div className="container-fluid loginback pb-5" ref={ref} id="login">
                <div className="row d-flex flex-column  flex-md-row">
                
                        <div className="col align-items-center mt-3">
                            <div className="row mt-5 mb-3 display-4 justify-content-center align-items-center lightcolordark">Opps! Login Required</div>
                            <form className="d-flex flex-column border border-3 border-dark rounded">
                                <label className="form-label fs-1 text-center my-3 fw-bold">Welcome to  <Title1 color="#0d6efd" weights="bold"/></label>
                                <label className="form-label fs-1  fw-bold ms-5 lightcolor">Enter Email :</label>
                                <input type="email" className="form-control  w-75 ms-5" value={email} onChange={(e) => setemail(e.target.value)} id="email" placeholder="Enter Email"></input>
                                <label className="form-label fs-1 fw-bold mt-3 ms-5  lightcolor ">Enter Password :</label>
                                <input type="password" className="form-control ms-5 w-75 mb-4" value={password} onChange={(e) => setpassword(e.target.value)} id="password" placeholder="Enter Password"></input>
                            
                                <div className="row mb-5">
                                    <div className="col"></div>
                                    <div className="col">
                                        <button type="submit" onClick={goToDashboard}  className="btn btn-primary fw-bold">Login</button>
                                    </div>
                                    <div className="col">
                                        <button type="submit" onClick={goToSignUp} className="btn btn-primary fw-bold">Sign Up</button>
                                    </div>
                                    <div className="col">
                
                                    </div>
                                </div>
                                <div className="row justify-content-center align-items-center mb-3 mx-5">
                                    {showAlert && <div className="text-danger display-5 fontdesign justify-content-center align-items-center">{message}</div> }
                                </div>
                            </form>

                            <div className="row mt-5"></div>
                        </div>

                    

                    <div className="col align-items-center mb-5">
                        <div className="row mt-5 mb-1 display-3 justify-content-center align-items-center lightcolor">Number of User</div>
                        <div className="container mt-4 p-3 rounded" style={{ backgroundColor: "#0D6EFD" }}> {/* Primary Color */}
                            <h3 className="text-center text-white fw-bold">User Growth Per Month</h3>
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default forwardRef(Login);