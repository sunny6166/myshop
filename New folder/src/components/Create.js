import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Create.css'

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '',
      brand: '',
      price:'',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:5000/upload", data, { 
       // receive two    parameter endpoint url ,form data
   })
   .then(res => { // then print response status
    console.log(res.statusText)
 })
}

  onSubmit = (e) => {
    e.preventDefault();

    const { name, color, brand,price } = this.state;

    axios.post('http://localhost:5000/api/products', { name, color, brand,price  })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { name, color, brand,price} = this.state;
    return (
      <div className="container">
        <div className="heading">
          <div className="panel-heading">
            <h3 className="title">
              Add Product
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/">Products</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label >Name:</label>
                <input type="text" name="name" value={name} onChange={this.onChange} placeholder="name" />
              </div>
              <div className="form-group">
                <label>Color:</label>
                <input type="text" name="color" value={color} onChange={this.onChange} placeholder="color" />
              </div>
              <div className="form-group">
                <label>Brand:</label>
                <input type="text" name="brand" value={brand} onChange={this.onChange} placeholder="brand" />
              </div>
              <div className="form-group">
                <label >Price:</label>
                <input type="number" name="price" value={price} onChange={this.onChange} placeholder="price"/>
              </div>
              <input type="file" name="file" onChange={this.onChangeHandler}/>
              <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
              <br></br>
              <button type="submit" className="btn">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;