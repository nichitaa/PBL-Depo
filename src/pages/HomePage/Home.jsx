import React from 'react';
import {Carousel} from 'react-bootstrap';

export default function Home() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://cdn.dodowallpaper.com/full/804/black-background-47.png"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>PBL: First slide label</h3>
                    <p>A cool intro about pbl</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://downloops.com/wp-content/uploads/edd/2016/11/Snowy3BlackBG-Gently_Falling_Snow_Motion_Background_Video_Loop_Sample3.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>PBL: Second slide label</h3>
                    <p>We can add as many slides as we want to</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

