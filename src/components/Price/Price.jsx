import "./Price.css";
import Title1 from "../title/title";



export default function Price()
{
    return(
    <>
        <div className="container-fluid">
            <div className="row align-items-center justify-content-center bg-light">
                <div className="row display-1 pt-5 align-items-center justify-content-center priceback priceTitle">look At The Options</div>
                <div className="row display-5 pt-1 pb-3 align-items-center justify-content-center priceback priceSlogan">You Would Like to Go</div>
            </div>
            <div className="row d-flex flex-column  flex-md-row align-items-center priceback">

                <div className="col mx-3 my-3 border border-3 border-dark rounded p-3 priceback1 w-75 w-md-50 w-lg-25 fw-bold">
                    <div className="row ms-2 my-3 fs-1">Free</div>
                    <div className="row ms-2 mb-1 fs-4">Explore how a <Title1  color="black" weights="bold"/> can simplify your finances.</div>
                    <div className="row ms-2 mb-1 fs-6">
                        <p>➔ Add, view, update, and delete expenses  </p>
                        <p>➔ Visualize spending with insightful graphs  </p>
                        <p>➔ Secure login for data protection </p>
                        <p>➔ Budget smarter and save more </p>
                        <p>➔ Track your money effortlessly! </p>
                    </div>
                    <div className="row fs-1 ms-2">
                        <div className="col-2">$0</div>
                        <div className="col-8">/month</div>
                    </div>
                </div>

                <div className="col mx-3 my-3 border border-3 border-dark rounded p-3 priceback1 w-75 w-md-50 w-lg-25 fw-bold">
                    <div className="row ms-2 my-3 fs-1">Plus</div>
                    <div className="row ms-2 mb-1 fs-4">Take control of your finances with advanced tracking.</div>
                    <div className="row ms-2 mb-1 fs-6">
                        <p>➔ Everything in Free</p>
                        <p>➔ Higher limits on expense tracking and data storage</p>
                        <p>➔ Custom budget categories and goal setting</p>
                        <p>➔ Advanced graph visualization for better decision-making</p>
                        <p>➔ Upgrade to Plus & manage your money smarter!</p>
                    </div>
                    <div className="row fs-1 ms-2">
                        <div className="col-2">$5</div>
                        <div className="col-8">/month</div>
                    </div>
                </div>

                <div className="col mx-3 my-3 border border-3 border-dark rounded p-3 priceback1 w-75 w-md-50 w-lg-25 fw-bold">
                    <div className="row ms-2 my-3 fs-1">Pro</div>
                    <div className="row ms-2 mb-1 fs-4">Unlock the ultimate expense tracking experience.</div>
                    <div className="row ms-2 mb-1 fs-6">
                        <p>➔ Everything in Plus</p>
                        <p>➔ Unlimited transaction tracking & financial data storage</p>
                        <p>➔ Personalized spending reports & goal-based recommendations</p>
                        <p>➔ Secure multi-device sync & premium support</p>
                        <p>➔ Upgrade to Pro & take full control of your finances!</p>
                    </div>
                    <div className="row fs-1 ms-2">
                        <div className="col-3">$20</div>
                        <div className="col-7">/month</div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}