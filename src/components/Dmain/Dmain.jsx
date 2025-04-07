import React, { useState } from "react";
import "./Dmain.css";
import { useEffect } from 'react';
import axios from 'axios';
import { CiTrash } from "react-icons/ci";


export default function Dmain() {
  const [add, setAdd] = useState(false); 
  const [view, setView] = useState(true);
  const [remove, setRemove] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setmessage] = useState("");
  const [toggle, settoggle] = useState(false);
  const [amount, setamount] = useState();
  const [date, setdate] = useState("");
  const [payfor , setpayfor] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);  // To control visibility of the alert
  const [opacity, setOpacity] = useState(1);
  
  const addView = () => {
    setAdd(true);
    setView(false);
    setRemove(false);
  };

  const viewView = () => {
    setAdd(false);
    setView(true);
    setRemove(false);
  };

  const removeView = () => {
    setAdd(false);
    setView(false);
    setRemove(true);
  };

  const getButtonClass = (section) => {
    return section ? "btn btn-light text-primary fw-bold mt-2 me-5 pt-2" : "btn btn-primary fw-bold pt-2 me-5";
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (email) {
      fetchExpenses();
    }
  }, [email]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.post('https://moneytracker-pm69.onrender.com/fetchExpenses', { email });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  };


  function RemoveX()
  {
    setmessage("");
    settoggle(false);
    setamount(0);
    setdate("");
    setpayfor("");
  }


  const ADDX = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    
    if(amount ==0 || payfor =="" || date=="" || amount<0){
        setmessage("fill the inputs properly");
        settoggle(true);
    }
    else{
    // Send POST request with email and password to the backend
    try {
      const response = await fetch('https://moneytracker-pm69.onrender.com/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, date, payfor , email }), // Send email and password
      });

      if (!response.ok) {
        throw new Error('Expense add failed!');
      }

      setmessage("Expense Add Successfully");
      settoggle(true);
      fetchExpenses();

    } catch (error) {
      console.error('Error:', error);
      setmessage(error);
      settoggle(true);
    }}
  };




  
  // Function to format date in dd Monthname, yyyy format
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options); // Example: 5 March, 2025
  };

  // Group expenses by month (e.g., March 2025, April 2025)
  const groupByMonth = (expenses) => {
    return expenses.reduce((result, expense) => {
      const month = new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      if (!result[month]) {
        result[month] = [];
      }
      result[month].push(expense);
      return result;
    }, {});
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    handleDeleteConfirm();
    setShowDialog(true); // Show confirmation dialog
  };

  const handleDeleteConfirm = async () => {
    try {
      // Send a request to the server to delete the payment by email and id
      await axios.delete('https://moneytracker-pm69.onrender.com/deletepayment', {
        data: { email, id: deleteId }
      });

      // Remove the deleted row from state (UI)
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== deleteId)
      );

      showAlertMessage();
      setShowDialog(false); // Close dialog
    }catch (error) {
      console.error('Error deleting payment:', error);
      setShowDialog(false); // Close dialog
    }
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



  const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
  // Render tables for each month
  const renderTables = () => {
    const groupedExpenses = groupByMonth(sortedExpenses);

    return Object.keys(groupedExpenses).map((month) => {
      const monthlyExpenses = groupedExpenses[month];
      const total = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

      return (
        <div key={month}>
          <h3 className="Dmainstyle text-center text-primary display-3 mt-3">{month}</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th className="Dmainstyle fs-2" >#</th>
                <th className="Dmainstyle fs-2">Date</th>
                <th className="Dmainstyle fs-2">Pay for</th>
                <th className="Dmainstyle fs-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {monthlyExpenses.map((expense, index) => (
                <tr key={index}><td>{index + 1}</td><td>{formatDate(expense.date)}</td><td>{expense.payfor}</td><td>${expense.amount}</td></tr>
              ))}
            </tbody>
            <tfoot>
              <tr><td colSpan="3"><strong>Total for {month}:</strong></td> {/* Label for the total */}<td><strong className="text-danger">${total}</strong></td> {/* Grand total for the month */}
              </tr>
            </tfoot>
          </table>
        </div>
      );
    });
  };


  const renderTables1 = () => {
    const groupedExpenses = groupByMonth(sortedExpenses);

    return Object.keys(groupedExpenses).map((month) => {
      const monthlyExpenses = groupedExpenses[month];
      const total = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

      return (
        <div key={month} class="table-responsive">
          <h3 className="Dmainstyle text-center text-primary display-3 mt-3">{month}</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th className="Dmainstyle fs-2" >#</th>
                <th className="Dmainstyle fs-2">Date</th>
                <th className="Dmainstyle fs-2">Pay for</th>
                <th className="Dmainstyle fs-2">Amount</th>
                <th className="Dmainstyle fs-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {monthlyExpenses.map((expense, index) => (
                <tr key={index}><td>{index + 1}</td><td>{formatDate(expense.date)}</td><td>{expense.payfor}</td><td>${expense.amount}</td><td><CiTrash className="display-3 fw-bold text-danger" onClick={() => handleDeleteClick(expense._id)} /></td></tr>
              ))}
            </tbody>
            <tfoot>
              <tr><td colSpan="3"><strong>Total for {month}:</strong></td> {/* Label for the total */}<td><strong className="text-danger">${total}</strong></td> {/* Grand total for the month */}
              </tr>
            </tfoot>
          </table>
        </div>
      );
    });
  };



  return (
    <div className="container-fluid ps-1 d-flex flex-column justify-content-center align-items-center Dmaincontainer">
      <div className="row  d-flex flex-column text-center pt-5">
          <div className="col display-3 ms-1 Dmainstyle">
            Welcome to Dashboard
          </div>
          <div className="col display-5 fs-md-4 ms-1 pb-2 text-primary Dmaintext">
           Tracker Your Xpense Here
          </div>
      </div>
      
      
      
      <div className="row pt-5 w-100">
        <div className="row mx-1 border border-3 border-primary rounded align-items-center justify-content-center Dmaincolor">
            <div className="col ms-5 my-2 d-flex justify-content-center align-items-center justify-content-lg-start align-items-lg-start">
                <button className={getButtonClass(add)} onClick={addView}>Add</button>
                <button className={getButtonClass(view)} onClick={viewView}>View</button>
                <button className={getButtonClass(remove)} onClick={removeView}>Remove</button>
            </div>
            <div className="row mt-1 mb-4 d-flex flex-column">
                {add && <div className="col bg-light text-primary border border-3 border-light rounded">

                <div className="row text-dark fs-1 mt-3 align-items-center justify-content-center Dmaintext fw-bold">Add Your Expenses</div>
                <div className="row ms-2 mt-3">
                    <div className="row fs-1 text-dark Dmainstyle">Amount : </div>
                    <div className="row mb-3">
                        <input type="number" className="form-control" id="amount" value={amount || 0} onChange={(e) => setamount(e.target.value)} placeholder="Enter amount" required></input>
                    </div>
                    <div className="row fs-1 text-dark Dmainstyle ">Date : </div>
                    <div className="row mb-2">
                        <input type="date" className="form-control" id="date" value={date || ''} onChange={(e) => setdate(e.target.value)} required></input>
                    </div>
                    <div className="row fs-1 text-dark Dmainstyle">Pay For :</div>
                    <div className="row mb-3">
                        <input type="text" className="form-control" id="description" value={payfor || ''} onChange={(e) => setpayfor(e.target.value)} placeholder="Enter description" required></input>
                    </div>
                    <div className="row my-2">
                        <div className="col">
                          <button type="submit"  onClick={ADDX} className="btn btn-primary w-100 fw-bold">Add</button>
                        </div>
                        <div className="col">
                          <button type="clear" onClick={RemoveX} className="btn btn-danger w-100 fw-bold">Clear</button>
                        </div>
                    </div>
                    <div className="row my-2 justify-content-center align-items-center">
                        {toggle && <div className="row my-4  display-5 text-dark fw-bold Dmainstyle justify-content-center align-items-center">{message}</div>}
                    </div>
                </div>

                    
                </div>}
                {view && <div className="col bg-light text-primary border border-3 border-light rounded">
                  <div className="row text-dark fs-1 my-3 align-items-center justify-content-center Dmaintext fw-bold">View Your Expenses</div>
                  <div className="row text-dark">
                  {renderTables()}
                  </div>
                </div>}

                {remove && <div className="col bg-light text-primary border border-3 border-light rounded">
                  <div className="row text-dark fs-1 my-3 align-items-center justify-content-center Dmaintext fw-bold">Remove Your Expenses</div>
                  {showAlert &&<div className="row text-success fs-1 align-items-center justify-content-center  Dmainstyle">Remove expense Successfully</div>}
                  <div className="row text-dark">
                  {renderTables1()}
                  </div>
                </div>}

            </div>
        </div>
      </div>
    </div>
  );
}
