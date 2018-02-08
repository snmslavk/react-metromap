import React, { Component } from 'react';

class ShareButtons extends Component {
    render() {
        return (
            <ul className="share-buttons">
                <li><a rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmymetromap.com&quote=Online%20metro%20map" title="Share on Facebook" target="_blank"><img alt="Share on Facebook" src="icons/Facebook.png" /></a></li>
                <li><a rel="noopener noreferrer" href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fmymetromap.com&text=Online%20metro%20map:%20https%3A%2F%2Fmymetromap.com" target="_blank" title="Tweet"><img alt="Tweet" src="icons/Twitter.png" /></a></li>
                <li><a rel="noopener noreferrer" href="https://plus.google.com/share?url=https%3A%2F%2Fmymetromap.com" target="_blank" title="Share on Google+"><img alt="Share on Google+" src="icons/GooglePlus.png" /></a></li>
                <li><a rel="noopener noreferrer" href="http://www.tumblr.com/share?v=3&u=https%3A%2F%2Fmymetromap.com&quote=Online%20metro%20map&s=" target="_blank" title="Post to Tumblr"><img alt="Post to Tumblr" src="icons/Tumblr.png" /></a></li>
                <li><a rel="noopener noreferrer" href="http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fmymetromap.com&description=Interactive%20metro%20maps%20where%20you%20can%20find%20your%20route%20from%20one%20station%20to%20another" target="_blank" title="Pin it"><img alt="Pin it" src="icons/Pinterest.png" /></a></li>
                <li><a rel="noopener noreferrer" href="https://getpocket.com/save?url=https%3A%2F%2Fmymetromap.com&title=Online%20metro%20map" target="_blank" title="Add to Pocket"><img alt="Add to Pocket" src="icons/Pocket.png" /></a></li>
                <li><a rel="noopener noreferrer" href="http://www.reddit.com/submit?url=https%3A%2F%2Fmymetromap.com&title=Online%20metro%20map" target="_blank" title="Submit to Reddit"><img alt="Submit to Reddit" src="icons/Reddit.png" /></a></li>
                <li><a rel="noopener noreferrer" href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fmymetromap.com&title=Online%20metro%20map&summary=Interactive%20metro%20maps%20where%20you%20can%20find%20your%20route%20from%20one%20station%20to%20another&source=https%3A%2F%2Fmymetromap.com" target="_blank" title="Share on LinkedIn"><img alt="Share on LinkedIn" src="icons/LinkedIn.png" /></a></li>
                <li><a rel="noopener noreferrer" href="http://wordpress.com/press-this.php?u=https%3A%2F%2Fmymetromap.com&quote=Online%20metro%20map&s=Interactive%20metro%20maps%20where%20you%20can%20find%20your%20route%20from%20one%20station%20to%20another" target="_blank" title="Publish on WordPress"><img alt="Publish on WordPress" src="icons/Wordpress.png" /></a></li>
                <li><a rel="noopener noreferrer" href="https://pinboard.in/popup_login/?url=https%3A%2F%2Fmymetromap.com&title=Online%20metro%20map&description=Interactive%20metro%20maps%20where%20you%20can%20find%20your%20route%20from%20one%20station%20to%20another" target="_blank" title="Save to Pinboard"><img alt="Save to Pinboard" src="icons/Pinboard.png" /></a></li>
                <li><a rel="noopener noreferrer" href="mailto:?subject=Online%20metro%20map&body=Interactive%20metro%20maps%20where%20you%20can%20find%20your%20route%20from%20one%20station%20to%20another:%20https%3A%2F%2Fmymetromap.com" target="_blank" title="Send email"><img alt="Send email" src="icons/Email.png" /></a></li>
            </ul>
        );
    }
}

export default ShareButtons;