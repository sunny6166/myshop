import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/'+this.props.match.params.id)
      .then(res => {
        this.setState({ product: res.data });
        console.log(this.state.product);
      });
  }

  onChange = (e) => {
    const state = this.state.product
    state[e.target.name] = e.target.value;
    this.setState({product:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, color, brand, } = this.state.product;

    axios.put('http://localhost:5000/api/'+this.props.match.params.id, { name, color, brand, })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div className="container">
        <div className="heading">
          <div className="panel-heading">
            <h3 className="panel-title">
              Edit Product
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="name">Name:</label>
                <input type="text" name="name" value={this.state.product.name} onChange={this.onChange} placeholder="name" />
              </div>
              <div className="form-group">
                <label for="color">Color:</label>
                <input type="text" name="color" value={this.state.product.color} onChange={this.onChange} placeholder="color" />
              </div>
              <div className="form-group">
                <label for="brand">Brand:</label>
                <input type="text" name="brand" value={this.state.product.brand} onChange={this.onChange} placeholder="brand" />
              </div>
              <button type="submit" className="btn-submit">Submit</button>
            </form>
          </div>
        </div>
        <h4><Link to={`/show/${this.state.product._id}`}>Return</Link></h4>
      </div>
      
    );
  }
}

export default Edit;