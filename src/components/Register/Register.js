import React from 'react'; 

 class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        };
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }
    onSubmitRegister = (e) =>{
        e.preventDefault();
        fetch('http://localhost:5000/user/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data =>{
            if(data){
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }
        }
        );
    }

    render() {
        return(
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div class="mt3">
                            <label className="db fw6 lh-copy f6" for="email-address">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={this.onNameChange}/>
                        </div>
                        <div class="mt3">
                            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" for="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="lh-copy mt3">
                        <p onClick = {this.onSubmitRegister}
                        className="f6 link dim black db pointer">Sign in</p>
                        </div>
                    </div>
                </main>
            </article>

        )
    }
}
export default Register; 