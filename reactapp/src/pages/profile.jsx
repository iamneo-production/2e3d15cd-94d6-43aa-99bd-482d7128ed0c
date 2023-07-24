import "../assets/styles/profile.css";
import CustomNavbar from "../components/navbar";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/footer";
import Name from "../components/name";
import { StarOutline } from "@mui/icons-material";
import Loading from "../components/loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile(){
    const [reviews,setReviews]=useState([]);
    const [loaded,setLoaded]=useState(false);
    const userid=useSelector((state)=>state.login.userDetails.id);
    const token=useSelector((state)=>state.login.token);
    const [orders,setOrders]=useState([]);
    const nav=useNavigate();
    const islogged=useSelector((state)=>state.login.isLoggedin);
    const [userpref,setPref]=useState([]);

    const getData=async()=>{
        const rev=await axios.get("http://localhost:8081/user/getUserReviews/"+userid,{
            headers: {
              'Authorization': 'Bearer ' + token
            }
        });
        setReviews(rev.data);
    }

    useEffect(()=>{
        if(!islogged)
        nav("/")
        else{
            getData();
            setTimeout(()=>{
                setLoaded(true);
            },1500)
        }
    },[])

    if(!loaded)
    return(
        <Loading/>
    )
    else
    return(
        <div className="profile-outer">
            <div className="profile-box">
                <div className="profile-nav">
                    <CustomNavbar currentPage="my-profile"/>
                </div>
                <div className="profile-orders">
                    <div className="orders-box">
                        <h3>Your Orders</h3>
                            {orders.length!==0?(
                             <>
                             {orders.map((o)=>{
                                return(
                                    <div className="order-cont">
                                        <div className="order-dets">

                                        </div>
                                    </div>
                                )
                             })}
                             </>   
                            ):
                            <div className="no-books">
                            You haven't placed any orders.
                            </div>
                            }
                    </div>
                </div>
                <div className="profile-reviews">
                <div className="reviews-box">
                            <h3>Your Reviews</h3>
                            {reviews.length!==0?(
                            <>
                                {reviews.map((r)=>{
                                    return(
                                    <div className="review-cont">
                                    <div className="review-custName">
                                        <h4>Book : {r.booktitle}</h4>
                                        <hr/>
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
                        </>
                        ):
                        <div className="no-books">
                        You haven't given any reviews.
                        </div>
                        }
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