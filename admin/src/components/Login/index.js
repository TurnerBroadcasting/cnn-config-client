import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import LoadingButton from '../common/LoadingButton';
import toastr from 'toastr';
import config from '../../config';
import axios from 'axios';
import NavBar from '../common/NavBar';
require('../../lib/local-cache.js');
const AUTH_TOKEN=config.authToken;
export default class Login extends Component {
  constructor()
  {
    super();
    this.state={
      isProcessingRequest:false,
      email:'',
      password:''
    };
    
  }
  
  async handleSubmit(e) {
    // Need to do something to log user in
    e.preventDefault();
    if(this.state.email && this.state.email.length > 0 && this.state.password && this.state.password.length > 0)
    {
    
      let payload={userid:this.state.email,password:this.state.password};
      
      try
      {
        this.setState({isProcessingRequest:true});
        let output =await axios.post(`${config.apiServerUrl}/login`,payload,{headers:{
           'Authorization':AUTH_TOKEN
        }});
        console.log(output.data)
        if(output.data && output.data.token &&  output.data.token.length > 0){
          localStorage.setCacheItem('__token', payload.userid,{ days: 1 });
          this.setState({isProcessingRequest:false});  
          browserHistory.push('/');
        }
        else {
          this.setState({isProcessingRequest:false});
          toastr.error(output.data.message);        
        }
      }
      catch(e){
        this.setState({isProcessingRequest:false});
         toastr.error('Unexpected error occured due to network failure.\n Please make sure you are connected to company network and try again.');
        console.error(e);
      }
      
      
    }
    

  }
  handleInput(e)
  {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }
  

  render() {
    const { email, password } = this.state;
    let SubmitButton=this.state.isProcessingRequest ? <LoadingButton className="btn btn-primary"/> : <button type="submit" onClick={(e)=>this.handleSubmit(e)} className="btn btn-primary">Sign in</button>;
    return (
      <div className="container" style={{paddingTop:"155px"}}>
        <NavBar/>
        <div className="card card-container">
          <div><h4><p className="text-center">Sign In</p></h4></div>
          <form role="form" data-toggle="validator" className="form-signin">
            <fieldset className="form-group">
              <label htmlFor="email" className="sr-only">Email:</label>
              <div className="form-group has-feedback">
                      <input name="email" value={this.state.email}  onChange={this.handleInput.bind(this)} className="form-control" type="email" placeholder="Work Email address"  required data-error="Oops!, that email address is invalid"/>
                      <span className="glyphicon form-control-feedback" aria-hidden="true"></span>
                      <div className="help-block with-errors"></div>
              </div>
              <div className="form-group has-feedback">
                    <label htmlFor="password" className="sr-only">Password:</label>
                      <input name="password" value={this.state.password} onChange={this.handleInput.bind(this)} type="password" autoComplete="off"  className="form-control" placeholder="NT Password" required
                        data-error="password is required" />
                      <span className="glyphicon form-control-feedback" aria-hidden="true"></span>
                      <div className="help-block with-errors"></div>
              </div>
               <div className="form-group">
                 {SubmitButton}
              </div>
            </fieldset>
          </form>
      </div>
    </div>
    );
  }
}






