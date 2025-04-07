import "./Information.css";
import Informationparts from "./Informationparts";
import {Titleparts} from "./Informationparts";
export default function Information()
{
    return(
        <>
            <div className="container-fluid informationback">
                <div className="row">
                    
                    <div className="row text-center mb-5">
                        <div className="col display-1 informationfont">We Served</div>
                    </div>

                    <div className="row d-flex flex-column  flex-md-row">
                        <div className="col d-flex flex-column">
                            <Titleparts titleparts="Our Features"/>
                            <ul className="list-styled ms-4">
                                <li><Informationparts informationparts="Expense Management"/></li>
                                <li><Informationparts informationparts="Income Tracking"/></li>
                                <li><Informationparts informationparts="Budget Planning"/></li>
                                <li><Informationparts informationparts="Financial Insights"/></li>
                                <li><Informationparts informationparts="Graphical Reports"/></li>
                            </ul>

                            <Titleparts titleparts="Expense Tracking"/>
                            <ul className="list-styled ms-4">
                                <li><Informationparts informationparts=" Add, View, Update, and Delete Expenses"/></li>
                                <li><Informationparts informationparts="Categorize Expenses"/></li>
                                <li><Informationparts informationparts="Track Monthly & Yearly Spending"/></li>
                                <li><Informationparts informationparts=" Export Reports (CSV, PDF)"/></li>
                            </ul>
                        </div>

                        <div className="col d-flex flex-column">
                            <Titleparts titleparts="Budgeting & Goals"/>
                            <ul className="list-styled ms-4">
                                <li><Informationparts informationparts="Set Budget Limits"/></li>
                                <li><Informationparts informationparts="Monitor Savings Goals"/></li>
                                <li><Informationparts informationparts="Receive Spending Alerts"/></li>
                            </ul>

                            <Titleparts titleparts="Security & Privacy"/>
                            <ul className="list-styled ms-4">
                                <li><Informationparts informationparts="Data Encryption"/></li>
                                <li><Informationparts informationparts="Two-Factor Authentication"/></li>
                                <li><Informationparts informationparts="Cloud Backup"/></li>
                            </ul>
                        
                            <Titleparts titleparts="Pricing"/>
                            <ul className="list-styled ms-4">
                                <li><Informationparts informationparts="Free Plan - Basic Features"/></li>
                                <li><Informationparts informationparts="Plus Plan - Advanced Features"/></li>
                                <li><Informationparts informationparts="Pro Plan - Unlimited Access"/></li>
                            </ul>
                        </div>

                        <div className="col d-flex flex-column">
                            <Titleparts titleparts="For Business"/>
                            <ul className="list-styled ms-4">
                                <li><Informationparts informationparts="Multi-User Expense Management"/></li>
                                <li><Informationparts informationparts="Team Budgeting Tools"/></li>
                                <li><Informationparts informationparts="Automated Invoice Tracking"/></li>
                            </ul>

                            <Titleparts titleparts="Resources"/>
                            <ul className="list-styled ms-4">
                                <li><Informationparts informationparts="Help Center"/></li>
                                <li><Informationparts informationparts="FAQs & Guides"/></li>
                                <li><Informationparts informationparts="Community Forum"/></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
       </>
    );
}