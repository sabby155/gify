import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import SignIn from './components/SignIn'
import Home from './components/Home'
import { withRouter } from 'react-router-dom';
import NavBar from './components/NavBar'
import FavoritesContainer from './components/FavoritesContainer';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' //https://fkhadra.github.io/react-toastify/installation

toast.configure()

class App extends React.Component {

  componentDidMount() {
    const user = localStorage.getItem('user')
    const favorites = JSON.parse(localStorage.getItem('storedGifs'))
    if(user) {
      this.props.setCurrentUser(user)
      if (favorites) {
        this.props.setUsersFavorites(favorites)
      }
    } 
  }

  render() {
    
      return (
      <div className="App">
        <header className="header-wrapper">
          <div className="header-text">
            <h1>Gify.</h1> 
          </div>
        </header>
        <NavBar />
        <Switch>
            <Route exact path="/sign-in" render={(routerProps) => (
                  <SignIn {...routerProps}/>
                )} />
            <Route exact path="/" render={(routerProps) => (
                  <Home {...routerProps}/>
                )} />
            <Route exact path="/favorites" render={(routerProps) => (
                  <FavoritesContainer {...routerProps}/>
                )} />
          </Switch>
      </div>
    );
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
    setCurrentUser: (user) => {
      return dispatch({
        type: "SET_CURRENT_USER",
        payload: user
      })
    },
    setUsersFavorites: (data) => {
      return dispatch({
        type: "SET_USER_FAVORITES",
        payload: data
      })
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
