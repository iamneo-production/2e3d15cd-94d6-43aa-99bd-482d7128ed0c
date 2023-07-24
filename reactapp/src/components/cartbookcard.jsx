import "./cartbookcard.css";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@mui/icons-material";
import { StarsRounded } from "@mui/icons-material";

const CartBookCard=({data,handleClick})=>{
    return(
        <div className="cart-book-card-outer">
                    <div className="remove-cart">
                    <DeleteOutlined onClick={()=>{handleClick(data)}}/>
                    </div>
            <Link className="cart-book-card-link" to={"/book/"+data.id}>
            <div className="cart-book-card-imdiv">
                <img className="cart-book-card-img" alt="book-cover" src={data.coverimage}/>
            </div>
            <div className="cart-book-card-details">
                <div className="cart-book-card-det">
                    <div className="book-title">
                    <h4>{data.title}</h4>
                    <p className="cart-book-card-author">{data.author}</p>
                    </div>
                    <div className="cart-book-card-rp">
                        <div className="cart-rating">
                        <StarsRounded id="cart-rating-star"/>
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