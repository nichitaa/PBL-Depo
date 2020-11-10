import React from 'react';
import {Jumbotron} from "react-bootstrap";
import { IconContext} from "react-icons";
import {ImGithub} from "react-icons/im";
import {FaLinkedin} from "react-icons/fa";
import {ImFacebook2} from "react-icons/im";
import {FaTelegramPlane} from "react-icons/fa";
import {AiOutlineMail} from "react-icons/ai";

const Footer = () => {
    return (
        <Jumbotron fluid>
            <IconContext.Provider value={{color:"purple", size:"3rem"}}>
                <div className="d-flex justify-content-around">
                    <a href="https://github.com/nikitaal">
                        <ImGithub/>
                    </a>
                    <a href="https://www.linkedin.com/">
                        <FaLinkedin/>
                    </a>
                    <a href="https://www.facebook.com/">
                        <ImFacebook2/>
                    </a>
                    <a href="https://web.telegram.org/#/login">
                        <FaTelegramPlane/>
                    </a>
                    <a href="https://outlook.live.com/owa/">
                        <AiOutlineMail/>
                    </a>

                </div>
            </IconContext.Provider>
        </Jumbotron>
    )
}

export default Footer;