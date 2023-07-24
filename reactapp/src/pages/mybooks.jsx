import "../assets/styles/mybooks.css";
import CustomNavbar from "../components/navbar";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import BookCard from "../components/bookcard";
import { useSelector } from "react-redux";
import MyBookssidebar from "../components/mybookssidebar";
import Footer from "../components/footer";
import Name from "../components/name";
import WishBookCard from "../components/wishlistbookcard";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";

function MyBooks(){
    const userid=useSelector((state)=>state.login.userDetails.id);
    const token=useSelector((state)=>state.login.token);
    const [library,setLibrary]=useState([]);
    const [bookmarks,setBookmarks]=useState([]);
    const [wishlist,setWishlist]=useState([]);
    const [loaded,setLoaded]=useState(false);
    const nav=useNavigate();
    const islogged=useSelector((state)=>state.login.isLoggedin);

    const getData=async()=>{
        try{
            const wishl=await axios.get("http://localhost:8081/user/wishlist/"+userid,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            const lib=await axios.get("http://localhost:8081/user/library/"+userid,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            const marks= await axios.get("http://localhost:8081/user/bookmark/"+userid,{
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            setWishlist(wishl.data.books);
            setLibrary(lib.data.books);
            setBookmarks(marks.data);
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(!islogged){
            nav("/")
        }
        else{
            getData()
            setTimeout(()=>{
                setLoaded(true);
            },1500)
        }
    },[])

    const [wishToast,setWishToast]=useState(false);

    const handleRemove=async(book)=>{
        await axios.delete("http://localhost:8081/user/deleteFromWishlist/"+userid+"/"+book.id,{
            headers: {
              Authorization: 'Bearer ' + token
            }
        })
        .catch((error)=>{
            console.log(error);
        })
        setWishToast(true);
        setTimeout(()=>{
            window.location.reload(true);
        },1000)
    }
    const handleToastClose=()=>{
        setWishToast(false);
    }
    if(!loaded)
    return(
        <Loading/>
    )
    else
    return(
        <div className="mybooks-outer">
            <Snackbar anchorOrigin={{vertical:'bottom',horizontal:'right'}} open={wishToast} onClose={handleToastClose} autoHideDuration={3000}>
                <Alert sx={{backgroundColor:'red',width:'300px',color:'white',translate:'15px 0'}} variant="success">
                    Book Deleted from Wishlist!                   
                 </Alert>
            </Snackbar>
            <div className="mybooks-box">
                <MyBookssidebar/>
                <div className="mybooks-nav">
                    <CustomNavbar currentPage="my-books"/>
                </div>
                <div className="mybooks-cont">
                    <div id="library" className="mybooks-div">
                        <div className="mybooks-title">
                        <h3>Your Library</h3>
                        </div>
                        <div className="mybooks-books">
                        {library.length!==0?(

                            <Row>
                        {library.map((n)=>{
                            return(
                                <Col md="3" className="exp-book-col">
                                <BookCard data={n}/>
                                </Col>
                                )
                            })}
                        </Row>
                        ):
                        <div className="no-books">
                            There are no books in your Library.
                        </div>
                        }
                        </div>
                    </div>
                    <div id="bookmarks" className="mybooks-div">
                        <div className="mybooks-title">
                            <h3>Your Bookmarks</h3>
                        </div>
                        <div className="mybooks-books">
                        {bookmarks.length!==0?(
                            <Row>
                        {bookmarks.map((n)=>{
                            return(
                                <Col md="3" className="exp-book-col">
                                <BookCard data={n}/>
                                </Col>
                                )
                            })}
                        </Row>
                        ):
                        <div className="no-books">
                            You haven't added any Bookmarks.
                        </div>
                        }
                        </div>
                    </div>
                    <div id="wishlist" className="mybooks-div">
                        <div className="mybooks-title">
                            <h3>Your Wishlist</h3>
                        </div>
                        <div className="mybooks-books">
                        {wishlist.length!==0?(
                            <Row>
                        {wishlist.map((n)=>{
                            return(
                                <Col md="3" className="exp-book-col">
                                <WishBookCard handleClick={handleRemove} data={n}/>
                                </Col>
                                )
                            })}
                        </Row>
                        ):
                        <div className="no-books">
                            You haven't added any Books to your wishlist.
                        </div>
                        }
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
export default MyBooks;