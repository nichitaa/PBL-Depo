import React from "react";
import s from "./notfound.module.css";
import image from "./404page.png";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

const PageNotFound = () => (
	<section
		style={{
			position: "fixed",
			top: "0",
			left: "0",
			zIndex: "3",
			backgroundImage: `url(${image})`,
			height: "102vh",
			width: "100vw",
			backgroundPosition: "center",
			backgroundSize: "cover",
			backgroundColor: "white",
		}}
		className={s.PageNotFound}
	>
		<Link to={ROUTES.HOME}>
			<button className={s.homeBtn}>Home Page</button>
		</Link>
	</section>
);

export default PageNotFound;
