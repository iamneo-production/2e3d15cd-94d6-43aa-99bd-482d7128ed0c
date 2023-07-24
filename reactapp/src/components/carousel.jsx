import { useState,useEffect } from "react"
import "./carousel.css";
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { ArrowLeftOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Carousel({data}){
    const [currentIndex,setIndex]=useState(0);
    const [fadeIn, setFadeIn] = useState(false);

    const nextImage=()=>{
        setFadeIn(false);
        setTimeout(()=>{
            setIndex(currentIndex===data.length-1 ? 0:currentIndex+1);
        },500);
    };
    const prevImage=()=>{
        setFadeIn(false);
        setTimeout(()=>{
            setIndex(currentIndex===0 ? data.length-1:currentIndex-1);
        },500);
    }

    useEffect(() => {
        setFadeIn(true);
      }, [currentIndex]);

    useEffect(()=>{
        const intervalId=setInterval(nextImage,5000);
        return()=>{
            clearInterval(intervalId);
        };
    },[currentIndex])
    return(
        <div className="carousel-outer">
            <div className="image-carousel" style={{ opacity: fadeIn ? 1 : 0, transition: 'opacity 0.5s' }}>
                <div className="carousel-butts">
                <button id="prev-button" onClick={prevImage}><ArrowLeftOutlined className="carousel-icons"/></button>
                </div>
                <div className="c-img">
                <img id="carousel-img" src={data[currentIndex]?.coverimage} alt="Carousel"/>
                </div>
                <div className="carousel-book-det">
                <Link className="route" to={"/book/"+data[currentIndex]?.id}>
                <h1 id="carousel-title">{data[currentIndex]?.title}</h1>
                </Link>
                <h4 id="carousel-title">{data[currentIndex]?.author}</h4>
                </div>
                <div className="carousel-butts">
                <button id="next-button" onClick={nextImage}><ArrowRightOutlinedIcon className="carousel-icons"/></button>
                </div>
            </div>
        </div>
    )
}
export default Carousel;