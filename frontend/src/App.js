import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';




class App extends Component {

  constructor(props) { 
    super(props);
    this.state = {
      product: [],
      query: '',
      key:"brand",
    };



    this.sortBy = this.sortBy.bind(this);
    
  }

  // searchbar input
  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })
  }

    
  // change sorting key
  sortBy(e){
    this.setState({key:e.target.id });
  }

  // part of sorting function - to sort array of objects by one of value
  compareValues = ( key, order='asc') => {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
          return 0; 
      }
  
      const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken'); // checking if someone has jwt Token
    axios.get('http://localhost:5000/api/products')  // getting list of product from DB
      .then(res => {
        this.setState({product : res.data
        })
      })
      .catch((error) => {                 // catch error 401 - unauthorized and send him to login page
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });

  }
  

  render() {

    const { product } = this.state;  // sorting products by a key - brand, color or name

    const renderproducts = product.map((prod) => { // creating list of products
          return (
        <div className = "products">
      <div className="product">
        <div className="content">
         <div className="content-left">
         <div className="Product-Image-Wrapper">
        </div>
         <h3>
         <div><b>Brand: </b><span>{prod.brand}</span></div>
           </h3>
            <div className="content-info">
            <div><b>Name: </b><span>{prod.name}</span></div>
            <div><b>Color: </b><span>{prod.color}</span></div>
          </div>
          <div>
          <Link to={`/show/${prod._id}`}>Details</Link>
          </div>
         </div>
        </div>
      </div>
      </div>
            )
        });

    return ( //rendering
      <div className="container-main">
          <div className="panel-body">
          <h4><Link to="/create">Add New Product</Link></h4> 
          </div>
          <form>
            <input
              placeholder="Search for..."
              ref={input => this.search = input} // search input
              onChange={this.handleInputChange}
            />
           </form>
           <h3>Sort:</h3>
           <table> 
              <thead>
                <tr>
                  <th>Brand <button type="button" id="brand"  onClick={ this.sortBy }>A-Z</button> </th>
                  <th>Name <button type="button" id="name" onClick={this.sortBy}>A-Z</button></th>
                  <th>Color <button type="button" id="color" onClick={this.sortBy}>A-Z</button></th>
                </tr>
              </thead>
            </table>
          <div>
          {renderproducts}                
          </div>
        </div>
    );
  }
}

export default App;
