import React from 'react';
import { connect } from 'react-redux'
import GifItem from './GifItem'
import StackGrid, { transitions } from "react-stack-grid";

const { helix } = transitions;

class GifContainer extends React.Component {
    
    renderGifs = () => {
        if (this.props.gifs) {
            return this.props.gifs.map(gif => {
                return (
                    <GifItem {...gif} key={gif.id}/>
                )
            })
        }
        
    }

    render() {
        return(
            <div>
                <div className="stack-grid">
                    <StackGrid 
                        columnWidth={225} 
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
    return {
        gifs: state.gifs
    }
}

export default connect(mapStateToProps)(GifContainer)
// export const ConnectedGifContainer = connect(mapStateToProps)(GifContainer)
// export const SizeAwareComponent = sizeMe()(GifContainer)
