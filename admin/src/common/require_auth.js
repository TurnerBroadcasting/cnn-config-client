import React, { Component } from 'react';
import {browserHistory} from 'react-router';

export default function(ComposedComponent) {
  class Authentication extends Component {
   
    
    componentWillMount() {
      console.log(localStorage.getCacheItem('__token'));
      if (!localStorage.getCacheItem('__token')) {
        browserHistory.push('/login');
      }
    }

    componentWillUpdate(nextProp,nextState) {
      if (!localStorage.getCacheItem('__token')) {
        browserHistory.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  } 
  return Authentication;
}
