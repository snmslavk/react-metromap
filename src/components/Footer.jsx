import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer class="container py-5">
                <div class="row">
                <div class="col-12 col-md">
                    <small class="d-block mb-3 text-muted">© 2018</small>
                </div>
                <div class="col-6 col-md">
                    <h5>Usefull links</h5>
                    <ul class="list-unstyled text-small">
                    <li><a class="text-muted" href="/prague">Prague Metro Map</a></li>
                    <li><a class="text-muted" href="/about">About</a></li>
                    <li><a class="text-muted" href="/prague">FAQ</a></li>
                    </ul>
                </div>
                <div class="col-6 col-md">
                    <h5>Download this app to your phone</h5>
                    <ul class="list-unstyled text-small">
                    <li><a class="text-muted" href="https://www.youtube.com/watch?v=XoIhPjS5y1M">What is it?</a></li>
                    <li><a class="text-muted" href="https://developers.google.com/web/progressive-web-apps/">Progressive web app</a></li>
                    </ul>
                </div>
                <div class="col-6 col-md">
        
                </div>
                <div class="col-6 col-md">
        
                </div>
                </div>
            </footer>
        );
    }
}

export default Footer;