import CustomNavbar from "../components/navbar"
import "../assets/styles/cart.css";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CartBookCard from "../components/cartbookcard";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Footer from "../components/footer";
import Name from "../components/name";

function Cart(){
    const books=useSelector((state)=>state.userActions.cart);
    const calcTotal=()=>{
        var total=0;
        books.forEach(element => {
            total=total+element.price;
        });
        return Math.round(total*100)/100;
    }
    return(
        <div className="cart-outer">
            <div className="cart-box">
                <div className="cart-nav">
                    <CustomNavbar currentPage="my-cart"/>
                </div>
                <div className="cart-cont">
                    <div className="cart-title">
                    <h3>Your Cart</h3>
                    </div>
                    <div className="cart-items">
                        <div className="cart-books">
                        <Row>
                        {books.map((n)=>{
                            return(
                                <Col md="4" className="exp-book-col">
                                <CartBookCard data={n}/>
                                </Col>
                                )
                            })}
                        </Row>
                        </div>
                        <div className="cart-details">
                            <div className="cart-det">
                                <h3>Cart Details</h3>
                                <div className="cart-pars">
                                <h5>No. of Books : {books.length}</h5>
                                </div>
                                <div className="cart-pars">
                                <h5>Total Price : </h5>
                                <h2>
                                 ${calcTotal()}
                                </h2>
                                <div className="check-out-button-cont">
                                    <Button className="check-out-button"variant="warning">Confirm and Check-Out</Button>
                                </div>
                                </div>
                            </div>
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
export default Cart;