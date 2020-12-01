import React from 'react';
import {Card, Button } from "react-bootstrap";
import {IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router-dom";
import moment from "moment";
import {IconContext} from "react-icons";
import * as ROUTES from "../../constants/routes";
import * as FIELDS from "../../constants/fields";
import {getRating} from "../../helpers";


const OneCard = ({project}) => (
    <Card style={{maxWidth: '18rem', maxHeight: '25rem', height: '25rem'}}>
        <div>
            <Card.Img variant="top"
                      src={project[FIELDS.IMAGE_URL]}
                      style={{maxHeight: '12rem'}}
            />
        </div>
        <Card.Body>
            <Card.Title>{project[FIELDS.TITLE]}</Card.Title>
            <Card.Text style={{maxHeight: '4rem', overflow: 'hidden'}}>
                {project[FIELDS.DESCRIPTION]}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <Link to={`${ROUTES.CATALOGUE}/${project[FIELDS.ID]}`}>
                                    <Button variant="outline-primary" >
                                        Read More <IoIosArrowForward size="1.4rem"/>
                                    </Button>
                                </Link>
                            </div>
                            <div className="col-md-12">
                                <IconContext.Provider value={{color: "purple", size: "1rem"}}>
                                    {getRating(project[FIELDS.RATING])}
                                </IconContext.Provider>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <small>
                                    Added: {moment(project[FIELDS.CREATED_AT].toDate()).calendar()}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card.Footer>
    </Card>
)
export default OneCard;