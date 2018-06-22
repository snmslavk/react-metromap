import React, { Component } from 'react';
import ShareButtons from './ShareButtons';

class Footer extends Component {
    render() {
        return (
            <footer className="container-fluid py-5 bg-dark text-white">
                <div className="row">
                <div className="col-12 col-md">
                    <small className="d-block mb-3 text-muted">© 2018</small>
                </div>
                <div className="col-6 col-md">
                    <h5>Usefull links</h5>
                    <ul className="list-unstyled text-small">
                    <li><a className="text-muted" href="/prague">Prague Metro Map</a></li>
                    <li><a className="text-muted" href="/about">About</a></li>
                    <li><a className="text-muted" href="/prague">FAQ</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Download this app to your phone</h5>
                    <ul className="list-unstyled text-small">
                    <li><a className="text-muted" href="https://www.youtube.com/watch?v=XoIhPjS5y1M">What is it?</a></li>
                    <li><a className="text-muted" href="https://developers.google.com/web/progressive-web-apps/">Progressive web app</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <ShareButtons />
                </div>
                <div className="col-6 col-md">
        
                </div>
                </div>
            </footer>
        );
    }
}

export default Footer;