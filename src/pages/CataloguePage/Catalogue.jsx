import React from 'react';
import {useDB} from "../../context/DBContext";
import {CardGrid, Loading} from "../../components";
import {Container, Col, Row} from "react-bootstrap";
import Search from "../../components/Search/Search";
import Filter from "../../components/Filter/Filter";

export default function Catalogue() {
    // displayed projects are a copy of all projects, we use it in order to display the searched projects
    const {
        displayedProjects: projects,
        loading,
    } = useDB();

    return (
        <>
            <Container>
                <Row>
                    <Col/>
                    <Col className="d-flex justify-content-center"
                         data-aos="fade-up"
                         data-aos-duration="500"
                         data-aos-delay="300"
                    >
                        <h2 style={{fontFamily: "Montserrat", fontSize: "40px", marginBottom: "20px"}}>
                            Catalogue
                        </h2>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={9} data-aos="fade-up"
                                 data-aos-duration="500"
                                 data-aos-delay="400">
                                <Search/>
                            </Col>
                            <Col data-aos="fade-up"
                                 data-aos-duration="500"
                                 data-aos-delay="500">
                                <Filter/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <div data-aos="fade-up"
                 data-aos-duration="500"
                 data-aos-delay="600">
                {loading ?
                    <Loading/> :
                    projects ?
                        <CardGrid projects={projects}/> :
                        <h1>No Projects Yet</h1>
                }
            </div>
        </>
    )
}