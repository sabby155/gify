import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class NavBar extends React.Component {
    state = { 
        activeItem: 'home' 
    }

    handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
    }

    handleSignOut = () => {
        localStorage.clear()
        this.props.removeUserData()
        this.props.history.push('/')
    }

    render() {
        const { activeItem } = this.state
        return (
            <nav>
                <Menu pointing secondary>
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='home'
                            active={activeItem === 'home'}
                            onClick={this.handleItemClick}
                            to = "/"
                            as = {Link}
                        />
                        <Menu.Item
                            name='favorites'
                            active={activeItem === 'favorites'}
                            onClick={this.handleItemClick}
                            to = "/favorites"
                            as = {Link}
                        />
                        {this.props.currentUser ? 
                            <Menu.Item
                                name='sign-out'
                                active={activeItem === 'sign-out'}
                                onClick={this.handleSignOut}
                            />
                            :
                            <Menu.Item
                                name='sign-in'
                                active={activeItem === 'sign-in'}
                                onClick={this.handleItemClick}
                                to = "/sign-in"
                                as = {Link}
                            />
                        }
                </Menu.Menu>
            </Menu>
        </nav>
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
    removeUserData: () => {
      return dispatch({
        type: "REMOVE_USER_DATA"
      })
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))