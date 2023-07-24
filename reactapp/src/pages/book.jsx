import "../assets/styles/book.css";
import CustomNavbar from "../components/navbar";
import books from "../assets/json/books.json";
import { useParams } from "react-router-dom";
import Name from "../components/name";
import Footer from "../components/footer";
import { Button } from "react-bootstrap";
import { StarOutline } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { addReviews,addWishlist, addtoCart } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";

function Book(){
    const dispatch=useDispatch();
    const params=useParams();
    const [newcomment,setComment]=useState("");
    const [rating,setRating]=useState(0);
    const [inValidRating,setInvalidRating]=useState(false);
    const [inValidComment,setInvalidComment]=useState(false);
    const [addedToCart,setCart]=useState(false);
    const [addedToWish,setWish]=useState(false);
    const userName=useSelector((state)=>state.login.userCreds).userName;
    const cart=useSelector((state)=>state.userActions.cart);
    const wishlist=useSelector((state)=>state.userActions.wishlist);
    const currBook=books.at(params.id-1);
    useEffect(()=>{
        window.scrollTo(0,0);
        if(cart.includes(currBook)){
        document.getElementById("addtocart-butt").style.backgroundColor="green";
        document.getElementById("addtocart-butt").style.color="white";
        document.getElementById("addtocart-butt").innerText="Added To Cart";
            setCart(true);
        }
        if(wishlist.includes(currBook)){
        document.getElementById("addtowish-butt").style.backgroundColor="green";
        document.getElementById("addtowish-butt").style.color="white";
        document.getElementById("addtowish-butt").innerText="Added To WishList";
        setWish(true);
        }

    },[cart,currBook,wishlist])
    const [reviews,setReviews]=useState([
        {
            username:"Ashizuki",
            review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            rating:4.5
        },
        {
            username:"Ash King",
            review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            rating:4.9
        },
        {
            username:"User",
            review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            rating:5
        }
    ]);
    
    const previewimages=[
        {img:"https://res.cloudinary.com/dzz4n6jj5/image/upload/v1668571369/samples/food/pot-mussels.jpg",id:"pre-img-1"},{img:"https://res.cloudinary.com/dzz4n6jj5/image/upload/v1668571373/samples/people/bicycle.jpg",id:"pre-img-2"},{img:"https://res.cloudinary.com/dzz4n6jj5/image/upload/v1668571374/samples/ecommerce/car-interior-design.jpg",id:"pre-img-3"},{img:"https://res.cloudinary.com/dzz4n6jj5/image/upload/v1668571391/cld-sample-5.jpg",id:"pre-img-4"}];


    const togglePreview=()=>{
        document.getElementById("book-pre").style.display="flex";
    }
    
    const toggleAddComment=()=>{
        document.getElementById("add-review").style.display="block";
    }

    const handleReview=(e)=>{
        e.preventDefault();
        var valid=true;
        setInvalidComment(false);
        setInvalidRating(false);
        if(newcomment===""){
            setInvalidComment(true);
            valid=false;
        }
        if(rating>5 || rating<1){
            setInvalidRating(true);
            valid=false;
        }
        if(valid){
            const newReview={
            username:userName,
            review:newcomment,
            rating:rating
        }
        const newReviewRedux={
            book:currBook,
            username:userName,
            review:newcomment,
            rating:rating
        }
        dispatch(addReviews(newReviewRedux));
        const addR=[...reviews,newReview];
        setReviews(addR);
        setComment("");
        setRating(0);
    }
        console.log(reviews);
    }

    const handleAddtoCart=()=>{
        document.getElementById("addtocart-butt").style.backgroundColor="green";
        document.getElementById("addtocart-butt").style.color="white";
        document.getElementById("addtocart-butt").innerText="Added To Cart";
        setCart(true);
        dispatch(addtoCart(currBook));
    }
    
    const handleAddtoWishlist=()=>{
        document.getElementById("addtowish-butt").style.backgroundColor="green";
        document.getElementById("addtowish-butt").style.color="white";
        document.getElementById("addtowish-butt").innerText="Added To WishList";
        setWish(true);
        dispatch(addWishlist(currBook));
    }

    const imagePreview=(y)=>{
        document.getElementById(y)?.requestFullscreen()
    }

    return(
        <div className="book-outer">
            <div className="book-box">
                <div className="book-nav">
                    <CustomNavbar currentPage="explore"/>
                </div>
                <div className="book-details">
                    <div className="book-title">
                    <h1>{currBook.title}</h1>
                    </div>
                    <div className="book-det-card">
                    <div>
                    <div className="book-cover">
                        <img className="book-img" alt="book-cover" src={currBook.image}/>
                    </div>
                        </div>
                    <div className="book-dets">
                        <div>
                        <h4>Author : {currBook.author}</h4>
                        <p>{currBook.synopsis}</p>
                        <h5>Rating : {currBook.rating}</h5>
                        <h3>$ {currBook.price}</h3>
                        </div>
                        <div>
                            <Button className="book-butts" variant="oultine-dark" onClick={togglePreview}>See Preview</Button>
                            <Button className="book-butts" variant="oultine-dark" id="addtocart-butt" disabled={addedToCart} onClick={handleAddtoCart}>Add to Cart</Button>
                            <Button className="book-butts" variant="oultine-dark" id="addtowish-butt" disabled={addedToWish} onClick={handleAddtoWishlist}>Add to Wishlist</Button>
                        </div>
                    <div id="book-pre" className="book-pre">
                        {previewimages.map((i)=>{
                            return(
                                <img onClick={(e)=>imagePreview(e.target.id)} id={i.id} alt={"pre-img"+i.id} className="preview-img" src={i.img}/>
                            );
                        })}
                    </div>
                    </div>
                    </div>
                    <div className="reviews">
                        <h2>What other readers have to say: </h2>
                        {reviews.map((r)=>{
                            return(
                                <div className="review-cont">
                                    <div className="review-custName">
                                        <h5>{r.username}</h5>
                                    </div>
                                    <div className="review-rating">
                                    <StarOutline/>{r.rating}
                                    </div>
                                    <div className="review-comment">
                                        <p>{r.review}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <Button className="book-butts" variant="oultine-dark" onClick={toggleAddComment}>Add Review</Button>
                    <div className="add-review" id="add-review">
                        <Form noValidate onSubmit={handleReview}>
                                <Row className="mb-3">
                                <Form.Group as={Col} md="2" controlId="add-review">
                                <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><StarOutline/></InputGroup.Text>
                                <Form.Control id="review-rating-bar" isInvalid={inValidRating} value={rating} onChange={(e)=>setRating(e.target.value)} max="5" type="number"/>
                                </InputGroup>
                                </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                <Form.Group>
                                <Form.Control as="textarea" rows={3} isInvalid={inValidComment} value={newcomment} onChange={(e)=>setComment(e.target.value)}/>
                                </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                <Button variant="outline-dark" type="submit" className="book-butts">Submit Comment</Button>
                                </Row>
                        </Form>
                    </div>
                </div>
                <div className="footer">
                <Footer/>
                </div>
            </div>
            <Name/>
        </div>
    )
}
export default Book;