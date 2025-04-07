import "./title.css";
export default function Title1({color, weights})
{
    return(
        <span id="title" style={{ color: color, fontWeight: weights }}>
            Money Tracker
        </span>
    );
}