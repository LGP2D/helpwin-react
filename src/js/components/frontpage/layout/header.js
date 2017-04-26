import React from "react";
import "../../../../styles/css/bootstrap.css";
import { Link, IndexLink } from 'react-router';


export default class Header extends React.Component {
    render() {
        return (
            <header>
                <div>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand">Helpwin LOGO</a>
                            </div>
                            <div className="navbar-collapse collapse">
                                <ul className="nav navbar-nav">
                                    <li><IndexLink to="/">Something</IndexLink></li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>                            
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/register">Register</Link></li>                                
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}
