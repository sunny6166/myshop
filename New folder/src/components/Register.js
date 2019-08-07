import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
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

    axios.post('http://localhost:5000/api/auth/register', { username, password })
      .then((result) => {
        this.props.history.push("/login")
      });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="container">
        <form className = "form" onSubmit={this.onSubmit}>
          <h1 >Register</h1>
          <label>Email address</label>
          <input type="email" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/>
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
          <button type="submit" className = "btn">Register</button>
          <p>
          <Link to="/Login">Already member</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Create;