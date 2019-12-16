import React, { useState } from  'react';
import { Link, Redirect } from 'react-router-dom';
import logoImg from '../img/logo.png';
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForm";
import { useAuth } from '../context/auth';
import axios from 'axios';

function Signup() {
    const [isSignedUp, setSignedUp] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");
    const { setAuthTokens } = useAuth();

function postSignup() {
    axios.post("https://wwww.somePlace.com/auth/signup", {
        email,
        userName,
        password,
        confirmPassword
    }).then(result => {
        if(result.status === 200) {
            setAuthTokens(result.data);
            setSignedUp(true);
        } else {
            setIsError(true);
        }
    }).catch(e => {
        setIsError(true);
    });

    if (isSignedUp) {
        return <Redirect to ="/" />;
    }
}

    return(
        <Card>
            <Logo src={logoImg} />
            <Form>
                <Input 
                type="email"
                value={email}
                onChange={e => {
                    setEmail(e.target.value);
                }} 
                    placeholder="email" 
                />

                <Input 
                type="username"
                value={userName}
                onChange={e => {
                    setUserName(e.target.value);
                }}
                    placeholder="username" 
                />

                <Input 
                type="password"
                value={password}
                onChange={e => {
                    setPassword(e.target.value);
                }} 
                    placeholder="password" 
                />

                <Input 
                type="password again"
                value={confirmPassword}
                onChange={e => {
                    setConfirm(e.target.value);
                }} 
                    placeholder="password again" 
                />

                <Button onClick={postSignup}>Sign Up</Button>

            </Form>
            <Link to="/login">Already have an account?</Link>
            { isError &&<Error>This user is already signed up! Please log in</Error>}
        </Card>
    );
}

export default Signup;