import React from 'react';
import { connect } from 'react-redux'
import GifItem from './GifItem'
import { Icon } from 'semantic-ui-react'
import StackGrid, { transitions } from "react-stack-grid";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button"; //https://www.npmjs.com/package/react-scroll-up-button

const { helix } = transitions;

class GifContainer extends React.Component {
    
    renderGifs = () => {

        if (this.props.gifs) {
            return this.props.gifs.map(gif => {
                let found = this.props.favorites.find(faveGif => faveGif.id === gif.id)
                let copiedGif = this.props.copiedGif
                 if(found) {
                     return (
                    <GifItem {...gif} key={gif.id} isInFave={true} copiedGif={copiedGif}/>
                    )

                } else {
                    return (
                        <GifItem {...gif} key={gif.id} isInFave={false} copiedGif={copiedGif}/>
                    )
                }   
                
            })

        }

    }



    render() {
       
        return(
            <div id="gif-container-wrapper">
                <div >
                    <StackGrid 
                        columnWidth={300} 
                        monitorImagesLoaded={true}
                        appear={helix.appear}
                        appeared={helix.appeared}
                        enter={helix.enter}
                        entered={helix.entered}
                        leaved={helix.leaved}
                        >
                        {this.renderGifs()}
                    </StackGrid>
                    <ScrollUpButton 
                        ContainerClassName="scroll-up-btn"
                        style={{
                        width: 30,
                        padding: 5,
                        outline: 'none',
                        border: 'none',
                        height: 30,
                        zIndex: 1000,
                        borderRadius: '50%',
                        backgroundColor: '#f2cee6',
                        boxShadow: '-2px 0 #0d1b1e, 0 -2px #0d1b1e, 2px 0 #0d1b1e, 0 2px #0d1b1e, 2px 2px #0d1b1e, -2px -2px #0d1b1e, -2px 2px #0d1b1e, 2px -2px #0d1b1e, 6px 6px #2dc7ff',
                        }}
                    ></ScrollUpButton>
                </div> 
            </div>
        )
    }

}

function mapStateToProps(state) {
    console.log('test from gif container to see if state copied gif', state)
    return {
        gifs: state.gifs,
        favorites: state.favorites,
        copiedGif: state.copiedGif
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // checkIfIsFavorite: (id) => {
        //     return dispatch({
        //         type: "CHECK_IF_IN_FAVE",
        //         payload: id
        //     })
        // }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GifContainer)

