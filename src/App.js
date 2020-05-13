import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import './App.css';
import 'tachyons'
import Particles from 'react-particles-js';

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
    }
  }

  onSubmit = () => {
    console.log('click')
  }

  onInputChange = (event) => {
    console.log(event.target.value)
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
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              {/*<FaceRecognition />*/}
      </div>
    );

  }
} 

export default App;
