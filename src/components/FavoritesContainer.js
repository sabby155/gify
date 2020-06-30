import React from 'react';
import { connect } from 'react-redux';
import { Container} from 'semantic-ui-react';

import StackGrid from "react-stack-grid";
import GifItem from './GifItem';


class FavoritesContainer extends React.Component {
    state = {
        isFave: true,
    }

    renderFavoriteGifs = () => {
        if (this.props.favorites) {
            const faveGifs = this.props.favorites;
            return faveGifs.map((gif) => {
                return <GifItem {...gif} key={gif.id} isInFave={true}/>
            })
        }
    }


    render() {
        return (
            <div className="favorites-wrapper">
                <h2>My Favorite Gifs</h2>
                <Container>
                    <StackGrid 
                        columnWidth={225} 
                        monitorImagesLoaded={true}
                        >
                        {this.renderFavoriteGifs()}
                    </StackGrid>
                </Container>
            </div>
        )
    }

}

function mapStateToProps(state) {
    console.log('checking state props from favroites container', state)

    return {
        currentUser: state.currentUser,
        favorites: state.favorites
    }
}


export default connect(mapStateToProps)(FavoritesContainer)