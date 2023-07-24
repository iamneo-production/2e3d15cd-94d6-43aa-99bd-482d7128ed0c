import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import '../assets/styles/login.css';
import logo from '../assets/images/logo.svg';
import { Link } from "react-router-dom";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import Name from "../components/name";
import { Person4Outlined } from "@mui/icons-material";
import { LockOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/loginSlice";

function Login(){
    const nav=useNavigate();
    const dispatch=useDispatch();
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [errors,setErrors]=useState({});
    const [valids,setValids]=useState({});

    const submitForm=(e)=>{
        e.preventDefault();
        if(validateForm()){
            dispatch(loginUser({userName:username,password:password}));
            nav("/home");
        }
    }
    const validateForm=()=>{
        var isValid=true;
        const currerr={};
        const currval={};
        if(username===""){
            currerr.uname="Invalid Username";
            isValid=false;
        }
        // else if(username!=="ashizuki"){
        //     //Check if username is present
        //     currerr.uname="Username Does Not Exist";
        //     isValid=false;
        // }
        else{
            currval.uname=username;
        }
        if(!validator.isStrongPassword(password,{
            minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
        })){
            currerr.password="Invalid Password";
            isValid=false;
        }
        // else if(password!=="@shiZuki32"){
        //     currerr.password="Wrong Password";
        //     isValid=false;
        // }
        else{
            currval.password=password;
        }
        setErrors(currerr);
        setValids(currval);
        return isValid;
    }

    return(
        <div className="login-outer">
            <div className="login-box">
        <div className="login-form">
            <Form noValidate className="loginForm" onSubmit={submitForm}>
                <h3>Sign-In</h3>
                <Row className="mb-3">
                <Form.Group controlId="uname">
                <Form.Label>Username</Form.Label>
                <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><Person4Outlined/></InputGroup.Text>
                <Form.Control type="text" isValid={!!valids.uname} isInvalid={!!errors.uname} placeholder="Username" value={username} onChange={(e)=>{setUserName(e.target.value)}} />
                <Form.Control.Feedback type='invalid'>
                    { errors.uname }
                </Form.Control.Feedback>
                </InputGroup>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group controlId="password">   
                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><LockOutlined/></InputGroup.Text>
                <Form.Control type="password" isValid={!!valids.password} isInvalid={!!errors.password} placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <Form.Control.Feedback type='invalid'>
                    { errors.password }
                </Form.Control.Feedback>
                </InputGroup>
                </Form.Group>
                </Row>
                <Row>
                <Form.Group controlId="sumbit">
                    <Button id="login-button" variant="outline-dark" type="submit">Sign In</Button>
                </Form.Group>
                </Row>
                <Row>
                    <Link to="/signup" className="route">
                    <Form.Text>New Here? Sign Up.</Form.Text>
                    </Link>
                </Row>
                <Row>
                    <Link to="/forgotpassword" className="route">
                    <Form.Text >Forgot Password?</Form.Text>
                    </Link>
                </Row>
            </Form>
        </div>
        <div className="login-bar">
        </div>
        <div className="login-img">
            <img id="login-logo" src={logo} alt="logo"/>
        </div>
        </div>
        <Name/>
        </div>
    );
}
export default Login;