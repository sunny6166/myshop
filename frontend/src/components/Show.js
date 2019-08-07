import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Show.css';

class Show extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getSingleProject();
  }

  getSingleProject = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/${params.id}`)
    .then( responseFromApi =>{
      const prod = responseFromApi.data;
      this.setState(prod);
    })
    .catch((err)=>{
        console.log(err)
    })
  }



// DELETE PROJECT:
  deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/${params.id}`)
    .then( () =>{
        this.props.history.push('/');         
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    return(
     <div className="product-details-container">
        <h1>{this.state.brand}</h1>
          <div className="product-info">
            <table>
              <tr>
                <th>Name</th>
                <td>{this.state.name}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{this.state.color}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>${this.state.price}</td>
              </tr>
              </table>
          </div>
			 	
               <button className="btn" onClick={() => this.deleteProject()}>Delete Product</button>
               <button className='btn'><Link to={'/'}>Back to products </Link></button>
               <button className='btn'><Link to={`/edit/${this.state._id}`} >Edit</Link></button>
      </div>
    )
  }
}

export default Show;