import React, { Component } from 'react';
import './Nav.css';
//import { Link } from 'react-router-dom';



class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
        }
    render() { 
        return ( 
        <div className="nav">
          <h2>
            Shopping App
          </h2>
          <div>
          {localStorage.getItem('jwtToken') &&
          <button className="log-out-btn" onClick={this.logout}>Logout</button> //logout button
            }   
        </div> 
        </div> 
        );
    }
}
 
export default Nav;







