import React from 'react';
// import myVideo from '../assets/testing-movie.mov'
class InfoContainer extends React.Component {
    render() {
        return(
            <div id="gif-info-container">
                {/* <video autoPlay loop muted width="200" height="100" id="video">
                <source src={require('../assets/lines-movie.mp4')} type="video/mp4"></source>
                </video>  */}

                <div id="gif-info-blurb">
                    <blockquote>GIFs were clip-art images and construction symbols, he explains. But now the GIF itself has become the destination. - <em>Jason Eppink, Museum of Moving Images</em></blockquote>
                    <p>What do Barack Obama, the sloth from Zootopia, and a bear waving its paw have in common? All were named “most popular in 2016” for that most zeitgeist-y of Internet memes: animated GIFs. Since their creation 30 years ago, the looping clips have followed a rocky path to stardom, going from ubiquitous to repudiated and back again.</p>
                </div>
                <div id="gif-info-images-wrapper">
                    <div id="lightning"></div>
                    <div id="hand-phone-splash-photo"></div>
                    <div id="phone-circle"></div>
                </div>
            </div>
        )
    }
}

export default InfoContainer;