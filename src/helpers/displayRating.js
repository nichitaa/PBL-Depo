import React from "react";
import { IconContext } from "react-icons";

// function to show the number of start on the page, depending on project rating
export default function displayRating(rating, star, color, size) {
	const ratingStars = [];
	const r = Math.round(rating);
	for (let i = 0; i < 5; i++) {
		if (i >= r) {
			color = "#2C3E50";
		}
		ratingStars.push(
			<React.Fragment key={i}>
				<IconContext.Provider value={{ color: color, size: size }}>
					{star}&nbsp;&nbsp;
				</IconContext.Provider>
			</React.Fragment>
		);
	}
	return ratingStars;
}
