import React from 'react';
// import myVideo from '../assets/testing-movie.mov'
class InfoContainer extends React.Component {
    render() {
        return(
            <div id="gif-info-container">
                {/* <video controls autoPlay loop muted width="300" height="150">
                <source src={require('../assets/testing-movie.mov')} type="video/mp4"></source>
                </video> */}

                <div id="gif-info-blurb">
                    <blockquote>GIFs were clip-art images and construction symbols, he explains. But now — the GIF itself has become the destination. - <em>Jason Eppink, Museum of Moving Images</em></blockquote>
                </div>
                <div id="hand-phone-splash-photo"></div>
            </div>
        )
    }
}

export default InfoContainer;