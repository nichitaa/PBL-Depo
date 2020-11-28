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
                            <li>Team</li>
                            <li>How to upload a project</li>
                            <li>GitHub Repository</li>
                            <LiveStats/>
                        </ul>
                    </div>
                </div>
                <div className="col d-md-flex justify-content-md-center align-items-md-center item social">
                    <i className="icon ion-social-facebook"/>
                    <i className="icon ion-social-twitter"/>
                    <i className="icon ion-social-snapchat"/>
                    <i className="icon ion-social-instagram"/>
                </div>
                <p className="copyright">PBL Depo © 2020</p>
            </div>
        </footer>
    </div>
)

export default Footer;