import CustomNavbar from "../components/navbar";
import "../assets/styles/home.css";
import Name from "../components/name";
import Homesidebar from "../components/homesidebar";
import Carousel from "../components/carousel";
import BookCard from "../components/bookcard";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading  from "../components/loading";
function Home(){ 
    const [newArrivals,setNewArrivals]=useState([]);
    const [forYou,setForYou]=useState([]);
    const [bookmarks,setBookmarks]=useState([]);
    const [loaded,setLoaded]=useState(false);
    const [bestSellers,setBestSellers]=useState([]);
    const [wishlist,setWishlist]=useState([]);
    const userid=useSelector((state)=>state.login.userDetails.id);
    const token=useSelector((state)=>state.login.token);
    const islogged=useSelector((state)=>state.login.isLoggedin);
    const nav=useNavigate();

    const getData=async ()=>{
        try{
            const arrivals=await axios.get("http://localhost:8081/open/newarrivals");
            const sellers=await axios.get("http://localhost:8081/open/bestsellers");
            const recomm= await axios.get("http://localhost:8081/user/forYou/"+userid,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            const marks= await axios.get("http://localhost:8081/user/bookmark/"+userid,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            const wishlist=await axios.get("http://localhost:8081/user/wishlist/"+userid,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            // console.log(arrivals.data);
            setNewArrivals(arrivals.data);
            setBestSellers(sellers.data);
            setForYou(recomm.data);
            setBookmarks(marks.data);
            setWishlist(wishlist.data.books);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(!islogged){
            nav("/")
        }
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
    return(
        <div className="home-outer">
            <div className="home-box">
                <Homesidebar />
                <div className="home-nav">
                <CustomNavbar currentPage="home"/>
                </div>
                <div className="home-top">
                    <div className="home-carousel">
                        <Carousel data={newArrivals}/>
                    </div>
                    <div className="cont-reading"id="bookmarks">
                        <div className="cont-reading-title">
                            <h2>Continue Reading</h2>
                        </div>
                        <div className="cont-reading-books">
                            {bookmarks.length!==0?(

                                <div className="c-books" >
                                {bookmarks?.map((b)=>{
                                    return(
                                        <BookCard data={b}/>
                                        )
                                    })}
                            </div>
                            ):
                            <div className="no-books">
                            You haven't added any Bookmarks.
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="home-tab">
                    <div className="home-books" id="wishlist">
                        {console.log(wishlist)}
                    <h2>Your Wishlist</h2>
                    {wishlist.length!==0?(

                        <div className="books-scroller">
                        {wishlist?.map((b)=>{
                            return(
                                <BookCard data={b}/>
                            )
                        })}
                        </div>
                    ):
                        <div className="no-books">
                        You haven't added any Books to your Wishlist.
                        </div>
                    }
                    </div>
                    <div className="home-books" id="foryou">
                    <h2>For You</h2>
                    {forYou.length!==0?(
                        <div className="books-scroller">
                        {forYou?.map((b)=>{
                        return(
                            <BookCard data={b}/>
                            )
                        })}
                        </div>
                    ):
                    <div className="no-books">
                    You haven't added any Preferences for Recommendations.
                    </div>
                    }
                    </div>
                    <div className="home-books" id="bestseller">
                    <h2>Best Sellers</h2>
                        <div className="books-scroller">
                        {bestSellers?.map((b)=>{
                        return(
                            <BookCard data={b}/>
                            )
                        })}
                        </div>
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
export default Home;