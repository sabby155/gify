import React from 'react';
import { Form, Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux'
import '../App.css'


class SearchBar extends React.Component {

    state = {
        searchBarClicked: true,
    }

    handleSearchBarInFocus = () => {
        this.setState({searchBarClicked: !this.state.searchBarClicked})
        this.props.setSearchBarClicked(this.state.searchBarClicked)
    }

    handleSearchBarInBlur = () => {
        this.setState({searchBarClicked: !this.state.searchBarClicked})
        this.props.setSearchBarClicked(this.state.searchBarClicked)
    }

    handleChange = (term) => {
        this.props.setTermChange(term)
    }

    handleClick = () => {
        const gifSection = document.querySelector('#search-container');

        const term = this.props.term;
        // const giphyApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw&q=${term}&limit=25&offset=0&rating=G&lang=en`;
        const giphyApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=eE8CyMnvnv9H4aI0UdS3o8QAaoG1GCOT&q=${term}&limit=30&offset=0&rating=G&lang=en`;

        fetch(giphyApiUrl, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            // console.log('is data working!? heres how much im getting back', data.data.length)
            this.props.saveGifs(data.data);
        })
        .catch(error => {
            console.log(error);
            console.log('Giphy API Error');
        });
        if (this.props.gifs) {
            gifSection.scrollIntoView({behavior: 'smooth', block: 'start' })
        }

    }

    render() {
        // console.log('from search', this.state.searchTerm)
        return(
            <div>
                <h2 id="search-header">Search Giphy</h2>
                <div id="search-container">
                    <div id="chat-image"></div>
                    <ul id="blah-text">
                        <li>blah</li>
                        <li>blah</li>
                        <li>blah</li>
                    </ul>
                    <div id="search-form">
                        <Form>
                            <Form.Field>
                            <Input 
                            size='small'
                            icon={{ name: 'check', circular: true, link: true, onClick: () => this.handleClick() }}
                            id="search-bar"
                            // placeholder='Search'
                            onChange={(e) => this.handleChange(e.target.value)}
                            onFocus={() => this.handleSearchBarInFocus()}
                            onBlur={() => this.handleSearchBarInBlur()}
                            />
                            </Form.Field>
                        </Form>    
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log('state from searchbar',state)
    return {
        currentUser: state.currentUser,
        gifs: state.gifs,
        term: state.term,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTermChange: (term) => {
            return dispatch({
                type: "SET_TERM_CHANGE",
                payload: term
            })
        },
        saveGifs: (data) => {
            return dispatch({
                type: "SAVE_GIFS",
                payload: data
            })
        },
        setSearchBarClicked: (data) => {
            return dispatch({
                type: "SET_SEARCHBAR_CLICK",
                payload: data
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)