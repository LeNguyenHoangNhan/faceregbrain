import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import "tachyons";
import Clarifai from "clarifai";

const app = new Clarifai.App({ apiKey: "0e597aad212e438b8c5c1b5837747b94" });

const particleParam = {
    paticles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            input: "",
            imageUrl: "",
            box: []
        };
    }

    displayFaceBox = box => {
        this.setState({ box });
    };
    calculateFaceLocation = data => {
        const clarifaiFaceRegions = data.outputs[0].data.regions;
        const image = document.getElementById("input_img");
        const imageWidth = Number(image.width);
        const imageHeight = Number(image.height);
        const box = clarifaiFaceRegions.map(region => {
            let faceBoundingBox = region.region_info.bounding_box;
            return {
                leftCol: faceBoundingBox.left_col * imageWidth,
                topRow: faceBoundingBox.top_row * imageHeight,
                rightCol: imageWidth - faceBoundingBox.right_col * imageWidth,
                bottomRow:
                    imageHeight - faceBoundingBox.bottom_row * imageHeight
            };
        });
        return box;
    };

    onLinkInputChange = ({ target }) => {
        this.setState({ input: target.value });
    };
    onSubmitButtonClick = () => {
        this.setState({ imageUrl: this.state.input, box: [] });
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => {
                this.displayFaceBox(this.calculateFaceLocation(response));
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        return (
            <div className="App">
                <Particles param={particleParam} className="particles" />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm
                    onLinkInputChange={this.onLinkInputChange}
                    onSubmitButtonClick={this.onSubmitButtonClick}
                />
                <FaceRecognition
                    imageUrl={this.state.imageUrl}
                    box={this.state.box}
                />
            </div>
        );
    }
}

export default App;
