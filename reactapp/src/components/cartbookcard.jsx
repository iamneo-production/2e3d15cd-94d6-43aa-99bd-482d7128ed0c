import "./cartbookcard.css";
import { StarOutlineSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";

const CartBookCard=({data})=>{
    return(
        <div className="cart-book-card-outer">
            <Link className="cart-book-card-link" to={"/book/"+data.id}>
            <div className="cart-book-card-imdiv">
                <img className="cart-book-card-img"src={data.image}/>
            </div>
            <div className="cart-book-card-details">
                <div className="cart-book-card-det">
                    <h4>{data.title}</h4>
                    <p className="cart-book-card-author">{data.author}</p>
                    <div className="cart-book-card-rp">
                        <div className="cart-rating">
                        <StarOutlineSharp id="rating-star"/>
                        {data.rating}
                        </div>
                        <div className="cart-pricing">
                        ${data.price}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        </div>
    );
}
export default CartBookCard;