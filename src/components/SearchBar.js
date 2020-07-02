import React from 'react';
import { Form, Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux'
import '../App.css'


class SearchBar extends React.Component {



    handleChange = (term) => {
        this.props.setTermChange(term)
    }

    handleClick = () => {

        const term = this.props.term;
        const giphyApiUrl = `https://api.giphy.com/v1/gifs/search?api_key=GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw&q=${term}&limit=20&offset=0&rating=G&lang=en`;

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
            this.props.saveGifs(data.data)

        })
        .catch(error => {
            console.log(error);
            console.log('Giphy API Error');
        });
    }

    render() {
        // console.log('from search', this.state.searchTerm)
        return(
            <div id="search-container">
                <div id="search-form">
                    <Form>
                        <Form.Field>
                        <Input 
                        size='small'
                        icon={{ name: 'check', circular: true, link: true, onClick: () => this.handleClick() }}
                        id="search-bar"
                        // placeholder='Search'
                        onChange={(e) => this.handleChange(e.target.value)}/
                        >
                        </Form.Field>
                    </Form>    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state from searchbar',state)
    return {
        currentUser: state.currentUser,
        gifs: state.gifs,
        term: state.term
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)