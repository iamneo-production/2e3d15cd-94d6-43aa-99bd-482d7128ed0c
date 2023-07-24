import "./bookcard.css";
import { StarsRounded} from "@mui/icons-material";
import { Link } from "react-router-dom";

const BookCard=({data})=>{
    return(
        <div className="book-card-outer">
            <Link className="book-card-link" to={"/book/"+data.id}>
            <div className="book-card-imdiv">
                <img className="book-card-img" alt="book-cover" src={data.coverimage}/>
            </div>
            <div className="book-card-details">
                <div className="book-card-det">
                    <div className="book-title">
                    <h4>{data.title}</h4>
                    <p className="book-card-author">{data.author}</p>
                    </div>
                    <div className="book-card-rating">
                        <StarsRounded id="rating-star"/>
                        {data.rating}
                    </div>
                </div>
            </div>
        </Link>
        </div>
    );
}
export default BookCard;