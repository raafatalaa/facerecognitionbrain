import React from 'react'; 
class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }
    
     onsubmitsignIn=(e) =>{
        e.preventDefault();
        fetch('http://localhost:5000/user/login',{
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.email,
           password: this.state.password
          })
        })
          .then(response => response.json())
          .then(data =>{
            if (data!=='error logging in'){
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }
        });
    }
    
    render() {
        return(
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
                <main className="pa4 black-80">
                    <form className="measure ">
                        <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div class="mt3">
                            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" for="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onsubmitsignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <a    onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db pointer">Register</a>
                        </div>
                    </form>
                </main>
            </article>

        )
    }
}
export default Signin; 