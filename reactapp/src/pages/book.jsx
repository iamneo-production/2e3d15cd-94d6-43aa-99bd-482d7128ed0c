import "../assets/styles/book.css";
import CustomNavbar from "../components/navbar";
import { useParams } from "react-router-dom";
import Name from "../components/name";
import Footer from "../components/footer";
import { Button } from "react-bootstrap";
import { StarsRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { InputGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";

function Book(){
    const params=useParams();
    const nav=useNavigate();
    const [newcomment,setComment]=useState("");
    const [rating,setRating]=useState(0);
    const [inValidRating,setInvalidRating]=useState(false);
    const [inValidComment,setInvalidComment]=useState(false);
    const [addedToCart,setInCart]=useState(false);
    const [addedToWish,setInWish]=useState(false);
    const islogged=useSelector((state)=>state.login.isLoggedin);
    const username=useSelector((state)=>state.login.userDetails.username)
    const [reviews,setReviews]=useState([]);
    const [currBook,setCurrBook]=useState({});
    const [previewimages,setPreviewImages]=useState([]);
    const userid=useSelector((state)=>state.login.userDetails.id);
    const token=useSelector((state)=>state.login.token);
    const [loaded,setLoaded]=useState(false);

    const getData=async()=>{
        try {
            const res=await axios.get("http://localhost:8081/open/bookbyid/"+params.id)
            const isBookCart= await axios.get("http://localhost:8081/user/bookInCart/"+userid+"/"+params.id,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            const isBookWish= await axios.get("http://localhost:8081/user/bookInWish/"+userid+"/"+params.id,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            const bookrevs=await axios.get("http://localhost:8081/user/getBookReviews/"+params.id,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            setCurrBook(res.data);
            var pimages=[]
            pimages.push(res.data.preimage1)
            pimages.push(res.data.preimage2)
            pimages.push(res.data.preimage3)
            pimages.push(res.data.preimage4)
            setPreviewImages(pimages)
            setReviews(bookrevs.data)
            if(isBookCart.data){
                setInCart(isBookCart.data)
            }
            if(isBookWish.data){
                setInWish(isBookWish.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        if(!islogged){
            nav("/")
        }
        else{
            window.scrollTo(0,0)
            getData();
            setTimeout(()=>{
                setLoaded(true);
            },1000)
            console.log(currBook);
        }
    },[])

    const [previewOpen,setPreview]=useState(false);
    
    const togglePreview=()=>{
        if(!previewOpen){
            document.getElementById("book-pre").style.display="flex";
            document.getElementById("preview-butt").innerText="Close Preview";
        }
        else{
            document.getElementById("book-pre").style.display="none";
            document.getElementById("preview-butt").innerText="See Preview";
        }
        setPreview(!previewOpen);
    }

    const [reviewOpen,setRev]=useState(false);
    
    const toggleAddComment=()=>{
        if(!reviewOpen){
            document.getElementById("add-review").style.display="block";
            document.getElementById("review-butt").innerText="Cancel";
        }
        else{
            document.getElementById("add-review").style.display="none";
            document.getElementById("review-butt").innerText="Add Review";
        }
        setRev(!reviewOpen);
    }

    const handleReview=async (e)=>{
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
        await axios.post("http://localhost:8081/user/addReview",{
            "rating":rating,
            "review":newcomment,
            "userid":userid,
            "bookid":params.id,
            "creator":username,
            "booktitle":currBook.title
        },{
            headers:{
                "Authorization":"Bearer "+token
            }
        }).catch((error)=>{
            console.log(error);
        })
        window.location.reload(true);
        }
    }
    const [cartToast,setCartToast]=useState(false);
    const [wishlistToast,setWishlistToast]=useState(false);

    const handleAddtoCart=async ()=>{
        axios.post("http://localhost:8081/user/addToCart/"+userid,{
            "id":params.id
        },{
            headers:{
                Authorization:"Bearer "+token
            }
        }).then((res)=>{
            document.getElementById("addtocart-butt").innerText="Added To Cart";
            setInCart(true);
            setCartToast(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    const handleAddtoWishlist=()=>{
        axios.post("http://localhost:8081/user/addToWishlist/"+userid,{
            "id":params.id
        },{
            headers:{
                Authorization:"Bearer "+token
            }
        }).then((res)=>{
            document.getElementById("addtowish-butt").innerText="Added To WishList";
            setInWish(true);
            setWishlistToast(true);
        })
        .catch((error)=>{
            console.log(error);
        })
       
    }
   const handleToastClose=()=>{
        if(cartToast)
        setCartToast(false);
        if(wishlistToast)
        setWishlistToast(false);
    }
    const imagePreview=(y)=>{
        document.getElementById(y)?.requestFullscreen()
    }
    if(!loaded){
        return(
            <Loading/>
        )
    }
    else{
        var k=0;
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
                        <img className="book-img" alt="book-cover" src={currBook.coverimage}/>
                    </div>
                        </div>
                    <div className="book-dets">
                        <div className="book-pars">
                        <h4>Author : {currBook.author}</h4>
                        <p>{currBook.synopsis}</p>
                        <h5>Rating : {currBook.rating}</h5>
                        <h3>$ {currBook.price}</h3>
                        </div>
                        <div>
                            <Button className="book-butts" id="preview-butt" variant="oultine-dark" onClick={togglePreview}>See Preview</Button>
                            <Button className="book-butts" variant="oultine-dark" id="addtocart-butt" disabled={addedToCart} onClick={handleAddtoCart}>Add to Cart</Button>
                            <Button className="book-butts" variant="oultine-dark" id="addtowish-butt" disabled={addedToWish} onClick={handleAddtoWishlist}>Add to Wishlist</Button>
                            <Snackbar anchorOrigin={{vertical:'bottom',horizontal:'right'}} open={cartToast} onClose={handleToastClose} autoHideDuration={3000}>
                                <Alert sx={{backgroundColor:'green',color:'white',width:'300px',translate:'15px 0'}} variant="success">
                                    Book Added to Cart!
                                </Alert>
                            </Snackbar>
                            <Snackbar anchorOrigin={{vertical:'bottom',horizontal:'right'}} open={wishlistToast} onClose={handleToastClose} autoHideDuration={3000}>
                                <Alert sx={{backgroundColor:'green',color:'white',width:'300px',translate:'15px 0'}} variant="success">
                                    Book Added to Wishlist!
                                </Alert>
                            </Snackbar>
                        </div>
                        <div id="book-pre" className="book-pre-cont">
                    <div className="book-pre">
                        {
                            previewimages.map((i)=>{
                                return(
                                    <img onClick={(e)=>imagePreview(e.target.id)} id={"pre-img"+(k++)} alt={"pre-img"+(k++)} className="preview-img" src={i}/>
                                    );
                                })}
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className="reviews">
                        <h2>What other readers have to say: </h2>
                        {reviews.length!==0?(

                            <div>
                        {reviews.map((r)=>{
                            return(
                                <div className="review-cont">
                                    <div className="review-custName">
                                        <h5>{r.creator}</h5>
                                    </div>
                                    <div className="review-rating">
                                    <StarsRounded id="book-rating-star"/>{r.rating}
                                    </div>
                                    <div className="review-comment">
                                        <p>{r.review}</p>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                        ):
                        <div className="no-books">
                        No Reviews have been given. Be the first!
                        </div>
                        }
                    </div>
                    <Button className="book-butts" variant="oultine-dark" id="review-butt" onClick={toggleAddComment}>Add Review</Button>
                    <div className="add-review" id="add-review">
                        <Form noValidate onSubmit={handleReview}>
                                <Row className="mb-3">
                                <Form.Group as={Col} md="2" controlId="add-review">
                                <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><StarsRounded/></InputGroup.Text>
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
                                <Button variant="outline-dark" type="submit" className="book-butts">Submit Review</Button>
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
}
export default Book;