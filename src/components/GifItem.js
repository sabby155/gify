import React from 'react';
import { Image,  Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../App.css'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';




class GifItem extends React.Component {

    state = {
        heartIsClicked: false,
        linkCopyIsClicked: false,
    }


    
    handleFavorite = (props) => {
        if (this.props.currentUser) {
            this.setState({heartIsClicked: !this.state.heartIsClicked})
            try {
                this.props.saveGifToFavorites(props); //saves to the database, "key", "value"
            } catch (error) {
                if (error) {
                    this.notifyDataExceeded() //data wasn't successfully saved due to setItem quota exceed so throw an error
                }
            } 
        } else {
            this.notifyEnterUsername()
            this.props.history.push('/sign-in')
        }
    }


    handleUnlike = (props) => {
        if (this.props.currentUser) {
            this.setState({heartIsClicked : !this.state.heartIsClicked})
            try {
                this.props.removeGifFromFavorites(props.id);
            } catch (error){
                if (error) {
                    console.log('something went wrong from state')
                }
            }
        } else {
            console.log('something went wrong')
        }
    }


    handleCopyLink = (props) => {
        // console.log('this is props from copied',props)
        if(this.props.currentUser) {
            this.setState({linkCopyIsClicked: !this.state.linkCopyIsClicked})
            try {
                this.props.setCopiedLinkGif(props); //goes through state to send gif info up to gif container lever to see anim.
                navigator.clipboard.writeText(props.bitly_gif_url) // copies to clipboard
            } catch (error) {
                if (error) {
                    console.log('issue in state when trying to identify gif & send data')
                }
            }
        } else {
            this.notifyEnterUsername()
            this.props.history.push('/sign-in')
        }
    }


    notifyEnterUsername = () => {
        toast('👻 Hi stanger! Please enter a username.')
    }

    notifyDataExceeded = () => {
        toast("❌ Oh no! You've exceeded your gif quota. Sorry!")
    }


    
    render() {
        // console.log('console.logging props from gif',this.props)
        // console.log('console.logging state from gif',this.state)
        const imageLink = this.props.images.downsized.url
        let heartID = this.state.heartIsClicked ? 'heart-btn-pressed-icon' : 'heart-btn-unpressed-icon'
        return(
            <div id='gif-container'>
                <div className="gif-content">
                    <Image 
                        className="gif-image"
                        src={imageLink} 
                        alt={this.props.title}>
                    </Image>
                    { this.props.isInFave ? 
                        (<div id="un-heart-icon-div">
                            <Icon circular inverted
                                size="small"
                                id={heartID}
                                name="minus circle"
                                color="purple"
                                onClick={() => this.handleUnlike(this.props)}
                            />
                        </div>) : 
                        (<div id="heart-icon-div">
                            <Icon circular inverted
                                size="small"
                                id={heartID}
                                name="heart"
                                color="purple"
                                onClick={() => this.handleFavorite(this.props)}
                            />
                        </div>)
                     }
                        <div id="link-icon-div">
                            <Icon circular inverted
                                size="small"
                                id="link-icon"
                                name="linkify"
                                color="blue"
                                onClick={() => this.handleCopyLink(this.props)}
                            />
                        </div>
                        { this.props.copiedGif.id === this.props.id ? 
                        (<div id="copied-text-effect">
                            <span>c</span>
                            <span>o</span>
                            <span>p</span>
                            <span>i</span>
                            <span>e</span>
                            <span>d</span>
                            <span>!</span>
                        </div>) : null}
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
        setCopiedLinkGif: (data) => {
            return dispatch({
                type: "SET_COPIED_LINK_GIF",
                payload: data
            })
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GifItem))

