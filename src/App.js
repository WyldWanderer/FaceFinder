import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import './App.css';
import 'tachyons'
import Particles from 'react-particles-js';
import Clarifai from "clarifai"

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
      imageUrl: ""
    }
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
        .then(
        function(response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
          // there was an error
      }
    );
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  render(){
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
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );

  }
} 

export default App;
