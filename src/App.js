import React , {Component} from 'react'; 
import Particles, { InteractivityDetect } from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'; 
import Navigation from './components/Navigation/Navigation'; 
import Logo from './components/Logo/Logo'; 
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'; 
import Rank from './components/Rank/Rank'; 
import Clarifai from 'clarifai';
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

const app = new Clarifai.App({
  apiKey: '5192a743416b4afe96aa241364a076cd'
 });

class App extends Component {

  constructor(){
    super(); 
    this.state={
      input:  '',
      ImageUrl: '', 
    }
  }

  onInputChange = (event) => {
     this.setState({input:event.target.value});  
  }

  onButtonClick = () => {
    this.setState({ImageUrl:this.state.input});
    app.models.predict( "53e1df302c079b3db8a0a36033ed2d15", 
    this.state.input).then(
    function(response){
      console.log(response); 
    },
    function(err){ 
        console.log('errror' , err);
    }
    );
  }


  render()
  {
      return (
      <div className="App">
        <Particles className="particles" params={particlesOptions}/>
          <Navigation/>
          <Logo/>
          <Rank/>
          <ImageLinkForm  
          onInputChange={this.onInputChange} 
          onButtonClick={this.onButtonClick} 
          />
          <FaceRecognition ImageUrl={this.state.ImageUrl}/>
          
      </div>
    );
 }
}

export default App;
