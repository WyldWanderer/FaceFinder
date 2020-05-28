import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "b3b9e57a6b734f5897847c4888965ff1"
});

const particlesOptions = {
  particles: {
    number: {
      value: 100
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        }
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "", 
      box: {},
    }
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  render() { 
    return (
      <div className="App">
        <Particles className='particles'
              params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} 
        onSubmit={this.onSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

 

export default App;
