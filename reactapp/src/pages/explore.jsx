import "../assets/styles/explore.css"
import CustomNavbar from "../components/navbar";
import { Form, Row } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import BookCard from "../components/bookcard";
import Col from "react-bootstrap/Col";
import { SearchOutlined } from "@mui/icons-material";
import Name from "../components/name";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Explore(){
    const [loaded,setLoaded]=useState(false);
    const [allbooks,setAllBooks]=useState([]);
    const [books,setBooks]=useState([]);
    const islogged=useSelector((state)=>state.login.isLoggedin);
    const nav=useNavigate();
    const getData=async ()=>{
        try{
            const fetch=await axios.get("http://localhost:8081/open/book")
            setAllBooks(fetch.data);
            setBooks(fetch.data);
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
            getData()
            setTimeout(()=>{
                setLoaded(true);
            },1500);
        }
    },[])

    const genreMatches=(genres,val)=>{
        var flag=false;
        genres.forEach((x)=>{
            console.log(x.toLowerCase().includes(val));
            if(x.toLowerCase().includes(val))
            flag=true;
        })
        return flag;
    }
    const filterData=(val)=>{
        if(val==="")
        setBooks(allbooks);
        else{
            var filtered=allbooks.filter((b)=>genreMatches(b.genre,val.toLowerCase()) || b.title.toLowerCase().includes(val.toLowerCase()) || b.author.toLowerCase().includes(val.toLowerCase()));
            setBooks(filtered);
        }
    }
    if(!loaded)
    return(
        <Loading/>
    )
    else
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