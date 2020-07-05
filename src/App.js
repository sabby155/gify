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
    const headerID = this.props.searchBarClicked ? 'header-move' : 'header-idle';
      return (
      <div className="App">
        <header className="header-wrapper">
          <div>
            <h1 id={headerID}>
                <span className="g">G</span>
                <span className="i">i</span>
                <span className="f">f</span>
                <span className="y">y</span>
                <span className="end">.</span>
            </h1> 
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
      // console.log('state from app',state)
  return {
    currentUser: state.currentUser,
    favorites: state.favorites,
    searchBarClicked: state.searchBarClicked,
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
