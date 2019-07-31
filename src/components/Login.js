import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import logo from '../logo-complete.svg'

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const bodyObj = {user: {
      username: this.state.username,
      password: this.state.password
    }}

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(bodyObj)
    }

    fetch('http://localhost:3000/api/v1/login', reqObj)
      .then(resp => resp.json())
      .then(user => {
        if(!user['error']){
          this.props.getUser(user)
        }else {
          alert(user.error);
        }
      })
      .catch(error => console.log(error))
  }
  render(){
    return (
      <div className='login-form'>
      {localStorage.getItem("user") ?  <Redirect to='/' /> : null}
      <img src={logo} alt='Sweet and Salty Snacks' />
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
          <label>Username: </label>
          <input onChange={this.handleChange} type="text" name="username" value={this.state.username}/>
          <br/><label>Password: </label>
          <input onChange={this.handleChange} type="password" name="password" value={this.state.password}/>
          <br/><input type="submit"/>
      </form>
      <Link to="/register">Register</Link>
    </div>
  )}
}

export default Login;
// onClick={()=> <Redirect to='/register' />}
