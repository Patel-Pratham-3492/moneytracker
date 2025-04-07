import "./Informationparts.css";

export function Titleparts({titleparts})
{
    return(
        <>
            <div className="container-fluid">
                <div className="row fs-1 ms-2 informationTitle">
                    {titleparts}
                </div>
            </div>
        </>
    );
}

export default function Informationparts({informationparts})
{
    return(
        <>
            <div className="container-fluid">
                <div className="row fw-bold">
                    {informationparts}
                </div>
            </div>
        </>
    );
}