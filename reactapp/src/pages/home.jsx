import CustomNavbar from "../components/navbar";
import "../assets/styles/home.css";
import Name from "../components/name";
import Homesidebar from "../components/homesidebar";
import Carousel from "../components/carousel";
import BookCard from "../components/bookcard";
import Footer from "../components/footer";
import bookmarks from "../assets/json/bookmarks.json"
import books from "../assets/json/imagecarousel.json"
import wishlist from "../assets/json/wishlist.json"
import foryoubooks from "../assets/json/foryou.json"
function Home(){ 
    return(
        <div className="home-outer">
            <div className="home-box">
                <Homesidebar />
                <div className="home-nav">
                <CustomNavbar currentPage="home"/>
                </div>
                <div className="home-top">
                    <div className="home-carousel">
                        <Carousel data={books}/>
                    </div>
                    <div className="cont-reading"id="bookmarks">
                        <div className="cont-reading-title">
                            <h2>Continue Reading</h2>
                        </div>
                        <div className="cont-reading-books">
                            <div className="c-books" >
                                {bookmarks.map((b)=>{
                                    return(
                                        <BookCard data={b}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-tab">
                    <div className="home-books" id="wishlist">
                    <h2>Your Wishlist</h2>
                        <div className="books-scroller">
                        {wishlist.map((b)=>{
                        return(
                            <BookCard data={b}/>
                            )
                        })}
                        </div>
                    </div>
                    <div className="home-books" id="foryou">
                    <h2>For You</h2>
                        <div className="books-scroller">
                        {foryoubooks.map((b)=>{
                        return(
                            <BookCard data={b}/>
                            )
                        })}
                        </div>
                    </div>
                    <div className="home-books" id="bestseller">
                    <h2>Best Sellers</h2>
                        <div className="books-scroller">
                        {books.map((b)=>{
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