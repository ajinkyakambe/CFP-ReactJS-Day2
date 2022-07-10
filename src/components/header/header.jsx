import React, { Component } from 'react';
import Logo from '../../Assets/images/logo.png'
import './header.scss';

class Header extends Component {
    render() {
        return (
           <>           
           <header className="header-content header">
            <div className="logo-content">
                <img src={Logo} alt="" />
                <div>
                    <span className="emp-text">EMPLOYEE</span>
                    <span className="emp-text emp-payroll">PAYROLL</span>
                </div>

            </div>

            </header>
            </>
        );
    }
}

export default Header;