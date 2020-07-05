import React from 'react';
import { connect } from 'react-redux'
import GifItem from './GifItem'
import StackGrid, { transitions } from "react-stack-grid";

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
            <div>
                <div className="stack-grid">
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
                </div> 
            </div>
        )
    }

}

function mapStateToProps(state) {
    // console.log('test from gif container to see if state copied gif', state)
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

