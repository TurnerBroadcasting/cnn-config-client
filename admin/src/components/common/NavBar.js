import React,{ Component } from "react";
import {Link} from 'react-router';
export default class NavBar extends Component {
    render() {
        let _logo=require('../../images/logo.png');
        let LogoutButton=localStorage.getCacheItem('__token') 
        ? <ul className="nav navbar-nav navbar-right">
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        :'';
        let BackButton=this.props.BackButton ? <ul className="nav navbar-nav navbar-left">
            <li><Link to="/"><i className="fa fa-chevron-left" aria-hidden="true"></i><img alt="" style={{padding:15}} src={_logo} height="34px"/></Link></li>
        </ul>:<img alt="logo" src={_logo} height="34px"/>;
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top" id="navigation" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            {BackButton}  
                        </div>
                        
                        {LogoutButton}        
                    </div>
                </nav>                   
            </div>
        );
    }
}