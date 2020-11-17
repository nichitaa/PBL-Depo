import React, { useRef, useState } from 'react';
import { Form, Card, Button, Container, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import * as ROUTES from "../../constants/routes";


export default function ForgotPassword() {

    const emailRef = useRef();

    const { resetPassword } = useAuth();

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage('Please check your inbox. A reset password email has been sent to you!')
        } catch {
            setError('Failed to reset password!')
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
                            <h2 className="text-center mb-4">Reset Password</h2>
                            {
                                error && <Alert variant="danger">{error}</Alert>
                            }
                            {
                                message && <Alert variant="success">{message}</Alert>
                            }
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label> Email </Form.Label>
                                    <Form.Control type="email" required ref={emailRef}/>
                                </Form.Group>
                                <Button type="submit" className="w-100" disabled={loading}>Reset</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <Link to="/login">Log In</Link>
                    </div>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}