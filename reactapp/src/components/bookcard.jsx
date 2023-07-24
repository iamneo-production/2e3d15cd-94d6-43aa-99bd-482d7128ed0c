import "./bookcard.css";
import { StarOutlineSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";

const BookCard=({data})=>{
    return(
        <div className="book-card-outer">
            <Link className="book-card-link" to={"/book/"+data.id}>
            <div className="book-card-imdiv">
                <img className="book-card-img"src={data.image}/>
            </div>
            <div className="book-card-details">
                <div className="book-card-det">
                    <div className="book-title">
                    <h4>{data.title}</h4>
                    </div>
                    <p className="book-card-author">{data.author}</p>
                    <div className="book-card-rating">
                        <StarOutlineSharp id="rating-star"/>
                        {data.rating}
                    </div>
                </div>
            </div>
        </Link>
        </div>
    );
}
export default BookCard;