import React from 'react';
import GifItem from './GifItem'
import { connect } from 'react-redux'


class RandomGeneratorContainer extends React.Component {

    handleClick = () => {
        const giphyApiUrl = `https://api.giphy.com/v1/gifs/random?api_key=eE8CyMnvnv9H4aI0UdS3o8QAaoG1GCOT&tag='illustration'`

            fetch(giphyApiUrl, {
                method: 'GET',
                header: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                // console.log('this is the data im getting back',data.data)
                this.props.saveRandomGif(data.data);
            })
            .catch(error => {
                console.log(error);
                console.log('Giphy API Error');
            });

        }


    renderRandomGif = () => {
        if (this.props.randomGif) {
            const height = this.props.randomGif.image_height;
            console.log('height of gif is', height )
            if (height >= 400) {
                const gif = this.props.randomGif
                let copiedGif = this.props.copiedGif
                    return (
                        <div id="random-gif-wrapper">
                        <GifItem {...gif} key={gif.id} isInFave={false} copiedGif={copiedGif}/>
                        </div>
                    )
                } else {
                    const gif = this.props.randomGif
                    let copiedGif = this.props.copiedGif
                    return (
                        <div id="random-gif-wrapper-small">
                        <GifItem {...gif} key={gif.id} isInFave={false} copiedGif={copiedGif}/>
                        </div>
                    )
                }

            }
   
    }
    
    render() {
        return (
            <div id="random-gen-container">
                <div id="random-gen-wrapper">
                    <div id="random-gen-images-content">
                        <div id="untitled-jpg"></div>
                        <div id="random-gen-circle"></div>

                    </div>
                    <div id="random-gif-container">
                    {/* <div id="random-gif-wrapper"> */}
                                {this.renderRandomGif()}
                        {/* </div> */}
                    </div>
                    <div id="random-gen-text-content">
                        <h2>Random Gif Generator</h2>
                        <p>Feeling lucky? Press ‘enter’ to generate a random GIF from the giphy engine.</p>
                        <button
                            onClick={() => this.handleClick()}
                        >Enter</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state from random gif gen',state.randomGif)
    return {
        copiedGif: state.copiedGif,
        randomGif: state.randomGif,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveRandomGif: (data) => {
            return dispatch({
                type: "SAVE_RANDOM_GIF",
                payload: data
            })
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(RandomGeneratorContainer)