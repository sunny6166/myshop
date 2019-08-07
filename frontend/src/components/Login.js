import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import { createHashHistory } from 'history';
export const history = createHashHistory();

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    axios.post('http://localhost:5000/api/auth/login', { username, password })
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: '' });
        this.props.history.push('/')
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  render() {
    const { username, password, message } = this.state;
    return (
      <div className="container">
        <form className="form" onSubmit={this.onSubmit}>
          {message !== '' &&
            <div className="alert" role="alert">
              { message }
            </div>
          }
          <h1>Please sign in</h1>
          <label>Email address</label>
          <input type="email"  placeholder="Email address" name="username" value={username} onChange={this.onChange} required/>
          <label>Password</label>
          <input type="password"  placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
          <button className="btn" type="submit">Login</button>
          <p>
            Not a member? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;