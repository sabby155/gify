import React from 'react';


class RandomGeneratorContainer extends React.Component {
    render() {
        return (
            <div id="random-gen-container">
                <div id="random-gen-wrapper">
                    <div id="random-gen-images-content">
                        <div id="untitled-jpg"></div>
                        <div id="random-gen-circle"></div>
                    </div>
                    <div id="random-gen-text-content">
                        <h2>Random Gif Generator</h2>
                        <p>Feeling lucky? Press ‘enter’ to generate a random GIF from the giphy engine.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default RandomGeneratorContainer