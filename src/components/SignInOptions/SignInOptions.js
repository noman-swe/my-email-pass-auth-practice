import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
// import viaGoogleAccount from '../../utilities/googleAuth';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import app from '../../firebase.init';



const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const SignInOptions = () => {

    const [user, setUser] = useState('');
    const [success, setSuccess] = useState(false);
    setSuccess(false);

    // via google auth
    const viaGoogleAccount = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                setUser(user);
                setSuccess(true);
            })
            .catch(error => { console.log(error) })
    }


    // via github
    const viaGithubAccount = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
    }

    // sign-out
    const googleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('sign-out');
                setUser({});
            })
            .catch(error => { console.error(error) })
    }





    return (
        <div className='border w-75 mx-auto'>
            <h4 className='text-center mt-5'>Sign in with </h4>

            <div className="signin-methods text-center">

                <Badge bg="secondary p-2 m-3 text-white text-wrap" style={{ 'cursor': 'pointer' }}>
                    <Link to='/emailPassword' className='text-white text-decoration-none'>via Email Password</Link>
                </Badge>

                <Badge onClick={viaGoogleAccount} bg="success p-2 m-3 text-white text-wrap" style={{ 'cursor': 'pointer' }}>via Google Authentication
                    <Link to={'/main'}></Link>

                </Badge>

                <Badge onClick={viaGithubAccount} bg="danger p-2 m-3 text-white text-wrap" style={{ 'cursor': 'pointer' }}>via Github Authentication

                </Badge>


                {success && <div className="result w-50 mx-auto">
                    <div className="user-info" style={{ 'border': '1px solid gray', 'padding': '20px', 'width': '600px' }}>
                        <img src={user.photoURL} alt="" />
                        <h2>Name : {user.displayName}</h2>
                        <p>Email: {user.email}</p>
                        <div className="back-button w-full d-flex mx-auto justify-content-end">
                            <Button variant="link" onClick={googleSignOut} className='mr-5'>log-out</Button>
                        </div>
                    </div>

                </div>
                }
            </div>
        </div>
    );
};

export default SignInOptions;