import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Home extends Component {


    render() {
        return (
            <div className="home">
                <h1>Welcome to <Link to="/">Messaging</Link></h1>
                <h2> <Link to="/Login">Login</Link></h2>
                <h2> <Link to="/Signup">Sign Up</Link></h2>

            </div>



        );
    }

}