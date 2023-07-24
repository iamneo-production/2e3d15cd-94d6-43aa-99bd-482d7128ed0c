import "./navbar.css";
import logo from "../assets/images/logo.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { HomeOutlined,SearchOutlined } from "@mui/icons-material";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Person4Outlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/loginSlice";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import axios from "axios";

export default function CustomNavbar(props){
    const dispatch=useDispatch();
    const nav=useNavigate();
    const userDets=useSelector((state)=>state.login.userDetails);
    const token=useSelector((state)=>state.login.token);
    const [cartsize,setCartSize]=useState(0);

    useEffect(()=>{

            const config = {
                headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        axios.get("http://localhost:8081/user/cart/"+userDets.id,config)
        .then((res)=>{
            setCartSize(res.data.books.length)
        })
        .catch((error)=>{
            console.log(error);
        })
    })
    
    useEffect(()=>{
        document.getElementById(props.currentPage).style.backgroundColor="black";
        document.getElementById(props.currentPage).style.color="white";
    },[props])

    const logout=()=>{
        dispatch(logoutUser());
        nav("/")
    }
    return(
        <div className="navbar-outer">
            <div className="navbar-img">
                <Link to="/home" className="route">
                <img id="navbar-logo" src={logo} alt="logo"/>
                </Link>
            </div>
            <div className="navbar-right">
                <div className="user-display">
                    <p className="nav-welcome">Welcome {userDets.firstName} !</p>
                    <div id="nav-logout">
                        <LogoutOutlinedIcon onClick={logout}id="nav-logout-icon"/>
                    </div>
                </div>
                <div className="navbar-buttons">
                    <Link to="/home" className="route">
                    <button id="home"className="nav-butt"><HomeOutlined/><p>Home</p></button>
                    </Link>
                    <Link to="/explore" className="route">
                    <button id="explore" className="nav-butt"><SearchOutlined/><p>Explore</p></button>
                    </Link>
                    <Link to="/my-books" className="route">
                    <button id="my-books" className="nav-butt"><AutoStoriesOutlinedIcon/><p>My Books</p></button>
                    </Link>
                    <Link to="/cart" className="route">
                    <button id="my-cart" className="nav-butt">
                        <Badge badgeContent={cartsize} color="secondary">
                        <ShoppingCartOutlinedIcon />
                        </Badge>
                        <p>My Cart</p></button>
                    </Link>
                    <Link to="/profile" className="route">
                    <button id="my-profile" className="nav-butt"><Person4Outlined /><p>My Profile</p></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}