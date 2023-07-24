import "../assets/styles/explore.css"
import CustomNavbar from "../components/navbar";
import allbooks from "../assets/json/books.json";
import { Form, Row } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import BookCard from "../components/bookcard";
import Col from "react-bootstrap/Col";
import { SearchOutlined } from "@mui/icons-material";
import Name from "../components/name";
import Footer from "../components/footer";
import { useState } from "react";

function Explore(){
    const [books,setBooks]=useState(allbooks);
    const filterData=(val)=>{
        if(val==="")
        setBooks(allbooks);
        else{
            var filtered=allbooks.filter((b)=>b.title.toLowerCase().includes(val.toLowerCase()) || b.author.toLowerCase().includes(val.toLowerCase()));
            setBooks(filtered);
        }
    }
    return(
        <div  className="explore-outer">
            <div className="explore-box">
                <div className="explore-nav">
                    <CustomNavbar currentPage="explore"/>
                </div>
                <div className="explore-cont">
                    <div className="exp-search">
                    <Row className="mb-1">
                        <Form.Group controlId="explore-search">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><SearchOutlined/></InputGroup.Text>
                            <Form.Control id="exp-search-bar" placeholder="Search" onChange={(e)=>filterData(e.target.value)} type="search"/>
                        </InputGroup>
                        </Form.Group>
                    </Row>
                    </div>
                    <div className="exp-books">
                        <Row>
                        {books.map((n)=>{
                            return(
                                <Col md="3" className="exp-book-col">
                                <BookCard data={n}/>
                                </Col>
                                )
                            })}
                        </Row>
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
export default Explore;