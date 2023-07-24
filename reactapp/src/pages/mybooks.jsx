import "../assets/styles/mybooks.css";
import CustomNavbar from "../components/navbar";
import books1 from "../assets/json/foryou.json";
import books2 from "../assets/json/bookmarks.json";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import BookCard from "../components/bookcard";
import { useSelector } from "react-redux";
import MyBookssidebar from "../components/mybookssidebar";
import Footer from "../components/footer";
import Name from "../components/name";

function MyBooks(){
    const Wishlist=useSelector((state)=>state.userActions.wishlist);
    return(
        <div className="mybooks-outer">
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
                        <Row>
                        {books1.map((n)=>{
                            return(
                                <Col md="3" className="exp-book-col">
                                <BookCard data={n}/>
                                </Col>
                                )
                            })}
                        </Row>
                        </div>
                    </div>
                    <div id="bookmarks" className="mybooks-div">
                        <div className="mybooks-title">
                            <h3>Your Bookmarks</h3>
                        </div>
                        <div className="mybooks-books">
                        <Row>
                        {books2.map((n)=>{
                            return(
                                <Col md="3" className="exp-book-col">
                                <BookCard data={n}/>
                                </Col>
                                )
                            })}
                        </Row>
                        </div>
                    </div>
                    <div id="wishlist" className="mybooks-div">
                        <div className="mybooks-title">
                            <h3>Your Wishlist</h3>
                        </div>
                        <div className="mybooks-books">
                        <Row>
                        {Wishlist.map((n)=>{
                            return(
                                <Col md="3" className="exp-book-col">
                                <BookCard data={n}/>
                                </Col>
                                )
                            })}
                        </Row>
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