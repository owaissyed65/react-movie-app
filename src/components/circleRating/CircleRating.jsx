import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./styles.scss";

const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "#DD3A5D" : rating < 7.5 ? "#F0821A" : "#199169",
                })}
            />
        </div>
    );
};
export default CircleRating;