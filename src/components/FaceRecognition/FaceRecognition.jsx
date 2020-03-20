import React from "react";
import "./FaceRecognition.css";
import { uid } from "react-uid";
const FaceRecognition = ({ imageUrl, box }) => (
    <div className="center">
        <div className="absolute mt2">
            <img
                src={imageUrl}
                alt="face"
                width="500px"
                height="auto"
                id="input_img"
            />
            {box.map(boundingBox => (
                <div
                    className="bounding-box"
                    key={uid(boundingBox)}
                    style={{
                        top: boundingBox.topRow,
                        right: boundingBox.rightCol,
                        bottom: boundingBox.bottomRow,
                        left: boundingBox.leftCol
                    }}
                />
            ))}
        </div>
    </div>
);

export default FaceRecognition;
