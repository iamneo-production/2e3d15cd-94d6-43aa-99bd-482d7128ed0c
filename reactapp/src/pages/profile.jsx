import "../assets/styles/profile.css";
import CustomNavbar from "../components/navbar";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import validator from "validator";
import { InputGroup } from "react-bootstrap";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { LockOutlined} from "@mui/icons-material";
import {Button} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/loginSlice";
import Footer from "../components/footer";
import Name from "../components/name";
import { StarOutline } from "@mui/icons-material";

export default function Profile(){
    const [confirmPassword,setConfirmPassword]=useState("");
    const [isError,setError]=useState(false);
    const [errMessage,setMessage]=useState(false);
    const userData=useSelector((state)=>state.login.userDetails);
    const userCreds=useSelector((state)=>state.login.userCreds);
    const reviews=useSelector((state)=>state.userActions.reviews);
    const [isEnabled,setEnabled]=useState(true);
    useEffect(()=>{
        setForm(userData);
    },[userData])
    const toggleEdit=()=>{
        var flag=isEnabled;
        setEnabled(!isEnabled);
        if(flag){
            document.getElementById("profile-button-edit").innerText="Cancel";
            document.getElementById("profile-button-edit").style.backgroundColor="red";
            document.getElementById("profile-button-edit").style.color="white";
        }
        else{
            setForm(userData);
            setConfirmPassword("");
            setError(false);
            setMessage("");
            document.getElementById("profile-button-edit").innerText="Edit";
            document.getElementById("profile-button-edit").style.backgroundColor="white";
            document.getElementById("profile-button-edit").style.color="black";    
        }
    }
    const dispatch=useDispatch();
    const [form,setForm]=useState(userData);
    const [errors,setErrors]=useState({});
    const [valids,setValids]=useState(userData);
    const submitForm=(e)=>{
        setError(false);
        setMessage("");
        e.preventDefault();
        window.scrollTo(0,0);
        const formErrors=validateForm();
        if(Object.keys(formErrors).length>0){
            setErrors(formErrors);
        }
        else{
            if(confirmPassword!==userCreds.password){
                setError(true);
                setMessage("Incorrect");
            }
            else{
                dispatch(updateUser(valids));
                toggleEdit();
            }
            setConfirmPassword("");
        }
    }
    const validateForm=()=>{
        const {firstName,lastName,Email}=valids;
        const newErrors={};
        if(!firstName || firstName==="") newErrors.firstName=(!!errors["firstName"]?errors["firstName"]:"Invalid First Name");
        if(!lastName || lastName==="") newErrors.lastName=(!!errors["lastName"]?errors["lastName"]:"Invalid Last Name");
        if(!Email || Email==="") newErrors.Email=(!!errors["Email"]?errors["Email"]:"Invalid E-mail");
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
           default:
                return [true,null];
        }
    }
    return(
        <div className="profile-outer">
            <div className="profile-box">
                <div className="profile-nav">
                    <CustomNavbar currentPage="my-profile"/>
                </div>
                <div className="profile-form">
                <Form  noValidate onSubmit={submitForm}>
                        <h3>Your Profile</h3>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="fname">
                                <Form.Label>First Name</Form.Label>
                                 <Form.Control disabled={isEnabled} isInvalid={!!errors.firstName} isValid={!!valids.firstName} type="text" placeholder="First Name" value={form.firstName} onChange={(e)=>setField("firstName",e.target.value)} />
                                 <Form.Control.Feedback type='invalid'>
                                    { errors.firstName }
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="lname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control disabled={isEnabled} type="text"isInvalid={!!errors.lastName} isValid={!!valids.lastName} placeholder="Last Name"  value={form.lastName} onChange={(e)=>setField("lastName",e.target.value)} />
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
                                        <Form.Control disabled={isEnabled} type="email" isValid={!!valids.Email} isInvalid={!!errors.Email} placeholder="example@demo.com" value={form.Email} onChange={(e)=>setField("Email",e.target.value)} />
                                <Form.Control.Feedback type='invalid'>
                                    { errors.Email }
                                </Form.Control.Feedback>
                                    </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="password">   
                                <Form.Label>Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><LockOutlined/></InputGroup.Text>
                                        <Form.Control disabled type="password" placeholder="Password" value={userCreds.password} />
                            </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group controlId="cnfpassword">   
                                <Form.Label>Confirm Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><LockOutlined/></InputGroup.Text>
                                        <Form.Control type="password" isInvalid={isError}  placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                                <Form.Control.Feedback type='invalid'>
                                    { errMessage }
                                </Form.Control.Feedback>
                                    </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        </Row>
                        <Row>
                            <Form.Group controlId="sumbit">
                                <Button id="profile-button" disabled={isEnabled} variant="outline-dark" type="submit">Submit</Button>
                                <Button id="profile-button-edit" variant="outline-dark" onClick={toggleEdit}>Edit</Button>
                            </Form.Group>
                        </Row>
                    </Form>
                </div>
                <div className="profile-reviews">
                <div className="reviews-box">
                            <h3>Your Reviews</h3>
                            {reviews.map((r)=>{
                            return(
                                <div className="review-cont">
                                    <div className="review-custName">
                                        <h4>Book : {r.book.title}</h4>
                                        <hr/>
                                    </div>
                                    <div className="review-rating">
                                    <StarOutline/>{r.rating}
                                    </div>
                                    <div className="review-comment">
                                        <p>{r.review}</p>
                                    </div>
                                </div>
                            )
                        })}
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