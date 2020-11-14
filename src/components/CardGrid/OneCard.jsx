import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import {IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router-dom";
import moment from "moment";
import {BsStar} from "react-icons/bs";
import {IconContext} from "react-icons";
import * as ROUTES from "../../constants/routes";


const OneCard = ({project}) => {
    // console.log("One Project Card:", project)
    const ratingStars = [];
    for(let i=0; i<project.rating; i++) {
        ratingStars.push(  <React.Fragment key={i}><BsStar/>&nbsp;</React.Fragment> )
    }
    return (
        <Card style={{maxWidth: '18rem', maxHeight: '25rem', height: '25rem'}}>
            <div>
                <Card.Img variant="top"
                          src={project.projectImageURL}
                          style={{maxHeight: '12rem'}}
                />
            </div>
            <Card.Body>
                <Card.Title>{project.projectName}</Card.Title>
                <Card.Text style={{maxHeight: '4rem', overflow: 'hidden'}}>
                    {project.projectDescription}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <Link to={`${ROUTES.CATALOGUE}/${project.projectId}`}>
                                        <Button variant="outline-primary"
                                        >Read More <IoIosArrowForward size="1.4rem"/></Button>
                                    </Link>
                                </div>
                                <div className="col-md-12">
                                    <IconContext.Provider value={{color: "purple", size: "1rem"}}>
                                        {ratingStars}
                                    </IconContext.Provider>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <small>
                                        Added: {moment(project.createdAt.toDate()).calendar()}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Card.Footer>
        </Card>
    );
}

export default OneCard;