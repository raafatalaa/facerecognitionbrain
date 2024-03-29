import React , {Component} from 'react'; 
import Particles, { InteractivityDetect } from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'; 
import Navigation from './components/Navigation/Navigation'; 
import Signin from './components/Signin/Signin'; 
import Register from './components/Register/Register'; 
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
      box: {} ,
      route: 'signin', 
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
 
  onInputChange = (event) => {
     this.setState({input:event.target.value});  
  }
  
  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  claculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width); 
    const height = Number(image.height); 
    //console.log(data);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row *height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row *height) 
    }
  }

  displayFaceBox = (box) => {
  this.setState({box: box});
  }

   onButtonClick =  () => {
    this.setState({ImageUrl:this.state.input});
    app.models.predict( "d02b4508df58432fbb84e800597b8959", 
    this.state.input).
    then(response => {
      if (response) {
        console.log(this.state.user.id);
         fetch('http://localhost:5000/user/images', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            if(count){
            this.setState(Object.assign(this.state.user, { entries: count.entries}))
            }
          });

      }
      this.displayFaceBox(this.claculateFaceLocation(response))
    })
    .catch(err => console.log(err));
}

  onRouteChange = (route) =>{
      if(route === 'signout'){
        this.setState({isSignedIn:false})
      }
      else if(route==='home'){
      this.setState({isSignedIn:true}); 
      }
      this.setState({route:route});

      console.log(route," ",this.state.isSigningedIn);
  }


  render()
  {
      return (
      <div className="App">
        <Particles className="particles" params={particlesOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
          {this.state.route==='home'
          ?
          <div>
            <Logo/>
            <Rank user = {this.state.user}/>
            <ImageLinkForm  
            onInputChange={this.onInputChange} 
            onButtonClick={this.onButtonClick} 
            />
            <FaceRecognition box={this.state.box} ImageUrl={this.state.ImageUrl}/>
            </div>
            :
            (
              this.state.route==='signin'
              ?<Signin onRouteChange={this.onRouteChange} loadUser = {this.loadUser} />
              :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            
            )
            
          }
      </div>
    );
 }
}

export default App;
