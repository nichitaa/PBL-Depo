import React, {useRef, useState} from 'react';
import {Form, Card, Button, Container, Alert} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import * as ROUTES from "../../constants/routes";
import history from "../../constants/history";


export default function LogIn() {

    const {currentUser} = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    const {login} = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // if user is already logged in ,pop up alert message
    if (currentUser) {
        alert('You are already logged in!')
        history.push(ROUTES.USER)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value, setError)
                .then(() => history.push(ROUTES.HOME))
                .catch(error => setError(error.message));
        } catch {
            setError('FAILED TO LOG IN')
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
                            <h2 className="text-center mb-4">Log In</h2>
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
                                <Button type="submit" className="w-100" disabled={loading}> Log In </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
                    </div>
                    <div className="w-100 text-center mt-2">
                        <Link to={ROUTES.FORGOT_PASSWORD}>Forgot your password?</Link>
                    </div>
                </div>
            </Container>
        </>
    );

}