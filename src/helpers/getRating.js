import React from "react";
import {BsStar} from "react-icons/bs";

// function to show the number of start on the page, depending on project rating
export default function getRating(rating) {
    const ratingStars = [];
    for (let i = 0; i < Math.round(rating); i++) {
        ratingStars.push(<React.Fragment key={i}><BsStar/>&nbsp;</React.Fragment>)
    }
    return ratingStars;
}
