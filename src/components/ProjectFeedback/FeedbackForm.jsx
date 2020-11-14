import React, {useState} from 'react';
import {Button, ButtonGroup, ButtonToolbar, Form, FormControl, InputGroup} from "react-bootstrap";
import {useAuth} from "../../context/AuthContext";
import {useDB} from "../../context/DBContext";

const FeedbackForm = () => {

    const { currentUser } = useAuth()
    const { sendFeedback } = useDB()

    const [feedback, setFeedback] = useState('')
    // if user will not pick a rating, the default will be 5
    const [userRating, setUserRating] = useState(5)

    const sendUserFeedback = async (e) => {
        e.preventDefault()
        if (!currentUser) {
            alert("Please sign in / sign up to rate this project!")
        } else {
            await sendFeedback(feedback, userRating)
            setFeedback(prevState => '')
        }
    }

    const rateTheProject = (e) => {
        if (!currentUser) {
            alert("Please sign in / sign up to rate this project!")
        } else {
            setUserRating(prevState =>  Number(e.target.value))
        }
    }

    return (
        <Form onSubmit={sendUserFeedback}>
            <InputGroup>
                <FormControl as="textarea"
                             rows={3}
                             placeholder="Your feedback here!"
                             value={feedback}
                             onChange={(e) => setFeedback(e.target.value)}
                />
            </InputGroup>
            <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                <p><strong>Rate this project:</strong></p>
                <ButtonGroup className="mr-2" aria-label="First group">
                    <Button variant="secondary" onClick={rateTheProject} value={1}>1</Button>
                    <Button variant="secondary" onClick={rateTheProject} value={2}>2</Button>
                    <Button variant="secondary" onClick={rateTheProject} value={3}>3</Button>
                    <Button variant="secondary" onClick={rateTheProject} value={4}>4</Button>
                    <Button variant="secondary" onClick={rateTheProject} value={5}>5</Button>
                </ButtonGroup>
            </ButtonToolbar>
            <Button type="submit">Rate this Project</Button>
        </Form>
    );
}

export default FeedbackForm;