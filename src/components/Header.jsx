import React, { Component } from 'react';
import './Header.css'
import logo from '../assets/images/logo.png';

class Header extends Component {
    render() {
        return (
            <div>
                <header className="header-content header">
                    <div className="logo-content">
                        <img src={logo} alt="" width="75px"/>
                        <div>
                            <span className="address-text">ADDRESS</span><br />
                            <span className="address-text address-book">BOOK</span>
                        </div>
                    </div>
                    
                </header>
            </div>
        );
    }
}

export default Header;
