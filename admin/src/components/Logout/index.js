import React, { Component } from 'react';
import {browserHistory} from 'react-router';
class Logout extends Component {
  componentWillMount() {
    this.SignoutUser();
  }
  SignoutUser(){
    localStorage.removeItem('__token');
    browserHistory.push('/');
  }
  
  render() {
    return <div>Success</div>;
  }
}

export default Logout;
