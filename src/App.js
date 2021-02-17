import React from 'react'; 
import Particles, { InteractivityDetect } from 'react-particles-js';
import Navigation from './components/Navigation/Navigation'; 
import Logo from './components/Logo/Logo'; 
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'; 
import Rank from './components/Rank/Rank'; 
import './App.css';

const particlesOptions= {
  Particles: {
    number: {
      value:80,
      density:{
        enable: true ,
        value_area:800
      }
    }
  },
  "interactivity": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      }
  }
}

function App() {
  return (
    <div className="App">
       <Particles className="particles" params={particlesOptions}/>
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm/>
        
    </div>
  );
}

export default App;
