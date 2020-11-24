import React from 'react';
import LiveStats from "../LiveStats/LiveStats";

const Footer = () => (
    <div className="footer-dark">
        <footer>
            <div className="container">
                <div className="row d-md-flex justify-content-md-center">
                    <div className="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">How to upload a project</a></li>
                            <li><a href="#">GitHub Repository</a></li>
                            <LiveStats/>
                        </ul>
                    </div>
                </div>
                <div className="col d-md-flex justify-content-md-center align-items-md-center item social">
                    <a>
                        <i className="icon ion-social-facebook"/>
                    </a>
                    <a>
                        <i className="icon ion-social-twitter"/>
                    </a>
                    <a>
                        <i className="icon ion-social-snapchat"/>
                    </a>
                    <a>
                        <i className="icon ion-social-instagram"/>
                    </a>
                </div>
                <p className="copyright">PBL Depo © 2020</p>
            </div>
        </footer>
    </div>
)

export default Footer;