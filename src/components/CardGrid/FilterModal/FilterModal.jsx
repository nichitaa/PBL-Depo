import React from 'react';
import {Modal} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {useDB} from "../../../context/DBContext";

const FilterModal = () => {

    const { getProjects, getProjectsByYear } = useDB();

    const filterNewestFirst = (e) => {
        getProjects("createdAt", "desc")
    }

    const filterOldestFirst = (e) => {
        getProjects("createdAt", "asc")
    }

    const HghRatingFirst = () => {
        getProjects("rating", "asc")
    }

    const LowRatingFirst = () => {
        getProjects("rating", "desc")
    }

    const byYear = (year) => {
        getProjectsByYear(year)
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    Filter Options Here
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                   Sort by:
                    <br/>
                    <Button variant="outline-dark" onClick={filterNewestFirst}>By date: new projects first</Button>
                    <Button variant="outline-dark" onClick={filterOldestFirst}>By date: old projects first</Button>
                    <br/>
                    <Button variant="outline-dark" onClick={LowRatingFirst}>By Rating: High </Button>
                    <Button variant="outline-dark" onClick={HghRatingFirst}>By Rating: Low</Button>
                    <br/>
                    <Button variant="outline-dark" onClick={() => byYear(1)}>First Year Projects</Button>
                    <Button variant="outline-dark" onClick={() => byYear(2)}>Second Year Projects</Button>
                    <Button variant="outline-dark" onClick={() => byYear(3)}>Third Year Projects</Button>
                    <Button variant="outline-dark" onClick={() => byYear(4)}>Forth Year Projects</Button>
                </Container>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </>
    )
}

export default FilterModal;