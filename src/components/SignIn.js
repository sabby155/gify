import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';

class SignIn extends React.Component {

    state = {
        username: "",
    }

    handleChange = (event) => { 
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = () => {
        const {username} = this.state;
        localStorage.setItem('user', username)
        this.props.setCurrentUser(username)
        this.props.history.push(`/`)
    }

    notify = () => {
        toast('🌈 That was easy.')
    }


    render() {
        return (
            <div id="sign-in-container">
                <video autoPlay loop muted >
                <source src={require('../assets/hello-there.mp4')} type="video/mp4"></source>
                </video>
                {/* <h3>Create a username to start saving gifs to favorites.</h3> */}
                <div id="sign-in-form">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Select a username</label>
                            <Input
                                name="username"
                                placeholder="Create a username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Button type="submit"
                                onClick={this.notify}
                        >Sign In</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentUser: (user) => {
            return dispatch({
                type: "SET_CURRENT_USER",
                payload: user
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);