import "./wishlistbookcard.css";
import { StarsRounded} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@mui/icons-material";

const WishBookCard=({data,handleClick})=>{
    return(
        <div className="wishbook-card-outer">
            <div className="remove-wish">
                    <DeleteOutlined onClick={()=>{handleClick(data)}}/>
            </div>
            <Link className="wishbook-card-link" to={"/book/"+data.id}>
            <div className="wishbook-card-imdiv">
                <img className="wishbook-card-img" alt="book-cover" src={data.coverimage}/>
            </div>
            <div className="wishbook-card-details">
                <div className="wishbook-card-det">
                    <div className="wishbook-title">
                    <h4>{data.title}</h4>
                    <p className="wishbook-card-author">{data.author}</p>
                    </div>
                    <div className="wishbook-card-rating">
                        <StarsRounded id="wish-rating-star"/>
                        {data.rating}
                    </div>
                </div>
            </div>
        </Link>
        </div>
    );
}
export default WishBookCard;