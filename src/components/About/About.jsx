import "./About.css";
import Title1 from "../title/title";
export default function About()
{
    return (
        <>

            <div className="container-fluid aboutMain">
                <div className="row d-flex flex-column">
                    <div className="row  d-flex flex-column text-center pt-5">
                        <div className="col display-1 ms-3" id="aboutTitle">
                            Money Tracker
                        </div>
                        <div className="col fs-1 fs-md-4 ms-3 pb-2" id="aboutSlogan">
                            Spend    Your    Money    Wisely
                        </div>
                    </div>
                    
                    <div className="row row d-flex flex-column text-center">
                        <div className="col w-100 ms-3 col-md-5 w-md-50">
                            A <Title1 color="#0d6efd" weights="bold"/> helps manage expenses by adding, viewing, updating, and deleting transactions.
                        </div>
                        <div className="col ms-3 pb-5 ">
                            Graphs provide insights for better budgeting, while secure login ensures data safety, 
                            making financial tracking easy and effective.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}