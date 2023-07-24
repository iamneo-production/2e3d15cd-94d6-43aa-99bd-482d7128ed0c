import "./loading.css";
import logo from "../assets/images/logo.svg";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

export default function Loading(){
    return(
        <div className="loading-outer">
            <Backdrop  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <div className="loading-box">
                <img id="loading-logo" src={logo} alt="logo"/>
                <CircularProgress sx={{color:"black"}}/>
            </div>
        </Backdrop>
        </div>
    );
}