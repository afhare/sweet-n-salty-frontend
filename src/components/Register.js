import React from 'react'
import { Redirect, Link } from 'react-router-dom';

class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      name:""
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
      name: this.state.name,
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

    fetch('http://localhost:3000/api/v1/users', reqObj)
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
    <div>
      <form onSubmit={this.handleSubmit}>
        <h1>Register</h1>
          <label>Username: </label>
          <input onChange={this.handleChange} type="text" name="username" value={this.state.username}/>
          <br/><label>Name: </label>
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name}/>
          <br/><label>Password: </label>
          <input onChange={this.handleChange} type="password" name="password" value={this.state.password}/>
          <br/><input type="submit"/>
      </form>
      <Link to="/login">Already have Account Login</Link>
    </div>
  )}
}

export default Register;
