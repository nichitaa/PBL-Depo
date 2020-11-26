import React, {useRef, useState} from 'react';
import {Form, Card, Button, Container, Alert} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import * as ROUTES from "../../constants/routes";
import history from "../../constants/history";

const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const {signup} = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // check if the password are the same
        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError('Passwords dont match!')
        }
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
                .then(() => history.push(ROUTES.HOME))
                .catch(error => setError(error.message));
        } catch {
            setError('FAILED TO SIGN UP!')
        }
        setLoading(false);

    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center"
                       style={{minHeight: "100vh"}}
            >
                <div className="w-100"
                     style={{maxWidth: "400px"}}
                >

                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            {
                                error && <Alert variant="danger">{error}</Alert>
                            }
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label> Email </Form.Label>
                                    <Form.Control type="email" required ref={emailRef}/>
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label> Password </Form.Label>
                                    <Form.Control type="password" required ref={passwordRef}/>
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label> Password Confirmation </Form.Label>
                                    <Form.Control type="password" required ref={passwordConfirmRef}/>
                                </Form.Group>
                                <Button type="submit" className="w-100" disabled={loading}>
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to={ROUTES.LOG_IN}>Log In</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default SignUp;