import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProductList from './views/product_list/product_list';
import Details from './views/details/details';
import Login from './views/login/login';
import axios from 'axios';

import './App.css';


class App extends Component {
  componentDidMount(){
    axios.get('/api/test')
    .then((response)=>{
      console.log(response.data)
    })
  }
  render () {
    return (
      <div className="App">
      <Router>
        <Switch>
          <Route path="/details/:id" component={Details} />
          <Route path="/products/:id" component={ProductList} />
          <Route path="/login/:id" component={Login} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
