import React from 'react';
import { Image,  Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../App.css'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';




class GifItem extends React.Component {

    state = {
        isClicked: false, 
    }


    
    handleFavorite = (props) => {
        if (this.props.currentUser) {
            this.setState({isClicked: !this.state.isClicked})
            try {
                this.props.saveGifToFavorites(props); //saves to the database, "key", "value"
            } catch (error) {
                if (error) {
                    alert("Sorry, you've exceeded your quota."); //data wasn't successfully saved due to setItem quota exceed so throw an error
                }
            } 
        } else {
            this.notify()
            this.props.history.push('/sign-in')
        }
    }



    notify = () => {
        toast('👻 Hi stanger! Please enter a username.')
    }


    
    render() {
        const imageLink = this.props.images.downsized.url
        let id = this.state.isClicked ? 'btn-pressed-icon' : 'btn-unpressed-icon'

        return(
            <div id='gif-container'>
                <div className="gif-content">
                    <Image 
                        className="gif-image"
                        src={imageLink} 
                        alt={this.props.title}>
                    </Image>
                    { this.props.isInFave ? null : 
                        <div id="icon-div">
                            <Icon circular inverted
                                id={id}
                                name="heart"
                                color="teal"
                                onClick={() => this.handleFavorite(this.props)}
                            />
                        </div>
                        }
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        favorites: state.favorites,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveGifToFavorites: (user) => {
            return dispatch({
                type: "SAVE_GIF_TO_FAVORITES",
                payload: user
            })
        },
        removeGifFromFavorites: (id) => {
            return dispatch({
                type: "REMOVE_GIF_FROM_FAVORITES",
                payload: id
            })
        },
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GifItem))

