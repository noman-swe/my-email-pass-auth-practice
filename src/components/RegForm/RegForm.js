import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import app from '../../firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const RegForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [registered, setRegistered] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleNameBlur = (event) => {
        setName(event.target.value);
    }
    const handleEmailBlur = (event) => {
        setEmail(event.target.value);
    }
    const handlePassBlur = (event) => {
        setPass(event.target.value);
    }

    const hanhleCheck = event => {
        setRegistered(event.target.checked);
    }

    // handle Submit form
    const handleFormSubmit = event => {
        event.preventDefault();
        if (!email && !name && !pass) {
            setError("fill the fields.");
        }
        else {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.stopPropagation();
            }

            // use RegularExpression
            if (!(/(?=.*[!@#$])(?=.[0-9])/.test(pass))) {
                setError('please insert minimum one special character and one number.');
                return;
            }

            setValidated(true);
            setError('');

            if (!registered) {
                // Create User
                createUserWithEmailAndPassword(auth, email, pass)
                    .then(result => {
                        const user = result.user;
                        setEmail('');
                        setPass('');
                        setSuccess('Successfully created your account.', <br />, user);
                        verifyEmail();
                        setUserName();
                    })
                    .catch(error => setError(error.message))
            }
            else {
                // Sign in - login in
                signInWithEmailAndPassword(auth, email, pass)
                    .then(result => {
                        const user = result.user;
                        console.log(user)
                        setSuccess('Logged in Successfully.')
                    })
                    .catch(error => { setError(error.message) })
            }

        }
    }

    // Log-out
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('Log- out.');
            })
            .catch((error) => {
                console.error(error);
            });

    }

    // verifyEmail
    const verifyEmail = () => {
        sendEmailVerification((auth.currentUser))
            .then(() => {
                setSuccess('Verification mail has sent to your email.');
            })
    }

    // forget Pass
    const forgetPasswordReset = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess('Reset Message has Sent to your mail');
            })
    }

    const setUserName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => { console.log('Updating Name.') })
            .catch((error) => setError(error))
    }


    return (
        <div className=''>
            <div className='login-registration w-50 border p-3 mx-auto mt-5'>
                <h2 className="text-primary"> {registered ? 'Log in' : 'Registration'}</h2>
                <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                    {!registered &&
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onBlur={handleNameBlur} type="Name" placeholder="Enter name" required />

                            <Form.Control.Feedback type="invalid">
                                Please provide a valid name.
                            </Form.Control.Feedback>
                        </Form.Group>}

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={handlePassBlur} type="password" placeholder="Password" autoComplete='on' required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <span className='text-danger'>{error}</span> <br />
                    <p className='text-success'>{success}</p>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check onChange={hanhleCheck} type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button onClick={forgetPasswordReset} variant="link">Forget Password?</Button> <br />

                    <Button variant="primary" className='mt-2' type="submit">
                        {registered ? "Log in" : 'Registration'}
                    </Button>
                </Form>
            </div>
            <div className="back-button w-50 d-flex mx-auto justify-content-end">
                <Button variant="link" className='mr-5'><Link to={'/'}>back</Link></Button>
            </div>
        </div>
    );
};

export default RegForm;