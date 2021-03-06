import React, { Component } from 'react';

class HeaderNavigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/about">About</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Cities
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/prague">Prague</a>
                            <a className="dropdown-item" href="/paris">Paris</a>
                            <a className="dropdown-item" href="/lisbon">Lisbon</a>
                            <a className="dropdown-item" href="/lisbon">Amsterdam</a>
                        </div>
                    </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default HeaderNavigation;