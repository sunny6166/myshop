import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';
import Edit from './components/Edit';
import Show from './components/Show';
import Nav from './components/Nav';

ReactDOM.render(
  <Router>
        <Route component = {Nav} />
      <div>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/create' component={Create} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/show/:id' component={Show} />
      </div>
  </Router>,
  document.getElementById('root')
);
//registerServiceWorker();
