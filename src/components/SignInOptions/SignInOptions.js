import React from 'react';
import { Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const SignInOptions = () => {
    return (
        <div>
            <h4 className='text-center mt-5'>Sign in with </h4>
            <div className="signin-methods text-center">

                <Badge bg="secondary p-2 m-3 text-white text-wrap" style={{ 'cursor': 'pointer' }}>
                    <Link to='/emailPassword' className='text-white text-decoration-none'>via Email Password</Link>
                </Badge>

                <Badge bg="success p-2 m-3 text-white text-wrap" style={{ 'cursor': 'pointer' }}>via Google Authentication
                    
                </Badge>

                <Badge bg="danger p-2 m-3 text-white text-wrap" style={{ 'cursor': 'pointer' }}>via Github Authentication
                   
                </Badge>
            </div>
        </div>
    );
};

export default SignInOptions;