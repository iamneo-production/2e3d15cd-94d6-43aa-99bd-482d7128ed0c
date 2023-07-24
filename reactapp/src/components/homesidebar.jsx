import { useState } from "react";
import "./sidebar.css";
import sideicon from "../assets/images/side_navigation_FILL0_wght400_GRAD0_opsz48.svg";
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import { ListOutlined } from "@mui/icons-material";
import { ArrowUpwardOutlined } from "@mui/icons-material";
import { StarOutlineOutlined } from "@mui/icons-material";

export default function Homesidebar(){
    const [isOpen,setOpen]=useState(false);
    const handleToggle=()=>{
        if(!isOpen){
            document.getElementById("side-ul").style.display="block";
        }
        else{
            document.getElementById("side-ul").style.display="none";
        }
        setOpen(!isOpen);
    }
    return(
        <div id="s-outer" className="sidebar-outer">
            <div id="s-butt" className="sidebar-buttons">
                <button id="side-butt" className="sidebar-toggle" onClick={handleToggle}><img src={sideicon} alt="side-nav"/></button>
                <ul id="side-ul"className="sidebar-list">
                <a href="#foryou" className="route"><li className="sidebar-element"><RecommendOutlinedIcon/>
                    <p>For You</p></li></a>
                    <a href="#bestseller" className="route"><li className="sidebar-element"><StarOutlineOutlined/><p>Best Sellers</p></li></a>
                    <a href="#wishlist" className="route"><li  className="sidebar-element"><ListOutlined/><p>Wishlist</p></li></a>
                    <a href="#bookmarks" className="route"><li className="sidebar-element"><BookmarksOutlinedIcon/><p>Bookmarks</p></li></a>
                    <li className="sidebar-element" onClick={()=>{window.scrollTo(0,0)}}><ArrowUpwardOutlined/></li>
                </ul>
            </div>
        </div>
    );
}