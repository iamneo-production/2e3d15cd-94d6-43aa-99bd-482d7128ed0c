import { useState } from "react";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputGroup } from "react-bootstrap";
import '../assets/styles/signup.css';
import {Button} from "react-bootstrap";
import logo from '../assets/images/logo.svg';
import validator from "validator";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Name from "../components/name";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { LockOutlined, Person4Outlined } from "@mui/icons-material";


function Signup(){
    const nav=useNavigate();
    const [form,setForm]=useState({});
    const [errors,setErrors]=useState({});
    const [valids,setValids]=useState({});
    const submitForm=(e)=>{
        e.preventDefault();
        window.scrollTo(0,0);
        const formErrors=validateForm();
        if(Object.keys(formErrors).length>0){
            setErrors(formErrors);
        }
        else{
            nav("/");
            console.log(valids);
        }
    }
    const validateForm=()=>{
        const {firstName,lastName,userName,Email,password,cnfPassword}=valids;
        const newErrors={};
        if(!firstName || firstName==="") newErrors.firstName=(!!errors["firstName"]?errors["firstName"]:"Invalid First Name");
        if(!lastName || lastName==="") newErrors.lastName=(!!errors["lastName"]?errors["lastName"]:"Invalid Last Name");
        if(!Email || Email==="") newErrors.Email=(!!errors["Email"]?errors["Email"]:"Invalid E-mail");
        if(!userName || userName==="") newErrors.userName=(!!errors["userName"]?errors["userName"]:"Invalid Username");
        if(!password || password==="") newErrors.password=(!!errors["password"]?errors["password"]:"Invalid Password")
        if(!cnfPassword || cnfPassword==="") newErrors.cnfPassword=(!!errors["cnfPassword"]?errors["cnfPassword"]:"Invalid Password");
        return newErrors;
    }
    const setField=(field,value)=>{
        setForm({
            ...form,
            [field]:value
        })
        const [isValid,message]=checkValid(field,value);
        if(isValid){
            setValids({
                ...valids,
                [field]:message
            })
            if(!!errors[field]){
                setErrors({
                    ...errors,
                    [field]:null
                })
            }
        }
        else{
            setErrors({
                ...errors,
                [field]:message
            })
            if(!!valids[field]){
                setValids({
                    ...valids,
                    [field]:null
                })
            }
        }
    }
    const checkValid=(field,value)=>{
        switch(field){
            case "firstName":
                if(value!=="" && validator.isAlpha(value)){
                    return [true,value];
                }
                return [false,"Invalid First Name"];
            case "lastName":
                if(value!=="" && validator.isAlpha(value)){
                    return [true,value];
                }
                return [false,"Invalid Last Name"];
            case "Email":
                if(value!=="" && validator.isEmail(value)){
                    return [true,value];
                }
                return [false,"Invalid E-mail"];
            case "userName":
                if(value==="")
                return [false,"Invalid Username"];
                //check if username is already taken below
                if(value==="ashizuki")
                return [false,"Username Already Taken"];
                return [true,value];
            case "password":
                if(validator.isStrongPassword(value,{minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1}))
                return [true,value];
                return [false,"Password Should Of Length 8 and Must Contain At least One Upper Case, One Lower Case, One Digit and a Special Character"];
            case "cnfPassword":
                if(value==="")
                return [false,"Invalid"];
                if(!!errors["password"])
                return [false,"Password is Invalid"];
                if(form["password"]!==value)
                return [false,"Does Not Match with Password"];
                return [true,value];
            default:
                return [true,null];
        }
    }
    return(
        <div className="signup-outer">
            <div className="signup-box">
                <div className="signup-form">
                    <Form  noValidate onSubmit={submitForm}>
                        <h3>Sign-Up</h3>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="fname">
                                <Form.Label>First Name</Form.Label>
                                 <Form.Control isInvalid={!!errors.firstName} isValid={!!valids.firstName} type="text" placeholder="First Name" value={form.firstName} onChange={(e)=>setField("firstName",e.target.value)} />
                                 <Form.Control.Feedback type='invalid'>
                                    { errors.firstName }
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="lname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text"isInvalid={!!errors.lastName} isValid={!!valids.lastName} placeholder="Last Name"  value={form.lastName} onChange={(e)=>setField("lastName",e.target.value)} />
                                <Form.Control.Feedback type='invalid'>
                                    { errors.lastName }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><EmailOutlinedIcon/></InputGroup.Text>
                                        <Form.Control type="email" isValid={!!valids.Email} isInvalid={!!errors.Email} placeholder="example@demo.com" value={form.Email} onChange={(e)=>setField("Email",e.target.value)} />
                                <Form.Control.Feedback type='invalid'>
                                    { errors.Email }
                                </Form.Control.Feedback>
                                    </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="uname">
                                <Form.Label>Username</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><Person4Outlined/></InputGroup.Text>
                                        <Form.Control type="text" isValid={!!valids.userName} isInvalid={!!errors.userName}  placeholder="Username" value={form.userName} onChange={(e)=>setField("userName",e.target.value)}/>
                                <Form.Control.Feedback type='invalid'>
                                    { errors.userName }
                                </Form.Control.Feedback>
                                    </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="password">   
                                <Form.Label>Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><LockOutlined/></InputGroup.Text>
                                        <Form.Control type="password" isValid={!!valids.password} isInvalid={!!errors.password} placeholder="Password" value={form.password} onChange={(e)=>setField("password",e.target.value)}/>
                                <Form.Control.Feedback type='invalid'>
                                    { errors.password }
                                </Form.Control.Feedback>
                                    </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="cnfpassword">   
                                <Form.Label>Confirm Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><LockOutlined/></InputGroup.Text>
                                        <Form.Control type="password" isValid={!!valids.cnfPassword} isInvalid={!!errors.cnfPassword}  placeholder="Confirm Password" value={form.confirmPassword} onChange={(e)=>setField("cnfPassword",e.target.value)}/>
                                <Form.Control.Feedback type='invalid'>
                                    { errors.cnfPassword }
                                </Form.Control.Feedback>
                                    </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="sumbit">
                                <Button id="signup-button" variant="outline-dark" type="submit">Sign Up</Button>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Link to="/" className="route">
                            <Form.Text >Already Have an Account?</Form.Text>
                            </Link>
                        </Row>
                    </Form>
                </div>
                <div className="signup-bar">
        </div>
        <div className="signup-img">
            <img id="signup-logo" src={logo} alt="logo"/>
        </div>
            </div>
            <Name/>
        </div>
    );
}
export default Signup;
