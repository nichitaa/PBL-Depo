import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Footer = () => {
	return (
		<>
			<div id="footer" className="footer-basic">
				<footer>
					<div className="social">
						<a href="https://www.instagram.com/faf.ngo/">
							<i className="icon ion-social-instagram" />
						</a>
						<a href="https://www.facebook.com/groups/utm.faf">
							<i className="icon ion-social-facebook" />
						</a>
					</div>
					<ul className="list-inline">
						<li className="list-inline-item">
							<Link to={ROUTES.HOME}>Home</Link>
						</li>
						<li className="list-inline-item">
							<Link to={ROUTES.GUIDE}>Guide</Link>
						</li>
						<li className="list-inline-item">
							<Link to={ROUTES.CATALOGUE}>Catalogue</Link>
						</li>
					</ul>
					<p className="copyright">PBL Depo© 2020</p>
				</footer>
			</div>
		</>
	);
};

export default Footer;
