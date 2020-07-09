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
import $ from 'jquery'; 

toast.configure()

class App extends React.Component {

  state={
    something: false,
  }

  componentDidMount() {
    const user = localStorage.getItem('user')
    const favorites = JSON.parse(localStorage.getItem('storedGifs'))
    if(user) {
      this.props.setCurrentUser(user);
      // JQuery event for moving the elemengts in teh header on mouse movement
      $(document).on("mousemove", (event) => {
        var $mouseX = event.pageX,
            $mouseY = event.pageY;
          $('#hand').css("margin-left", - ($mouseY * 0.01) + 'px');
          $('#thumbsup').css("margin-left", -($mouseX * 0.02) + 'px');
          $('#coffee').css("margin-left", - ($mouseY * 0.01) + 'px');
          $('#sunglass').css("margin-left", -($mouseX * 0.02) + 'px');

          $('#bulb').css("margin-top", - ($mouseY * 0.01) + 'px');
          $('#robot').css("margin-top", -($mouseX * 0.02) + 'px');
          $('#music').css("margin-top", - ($mouseY * 0.01) + 'px');
          $('#squigley').css("margin-top", -($mouseX * 0.02) + 'px');

          $('#waves').css("margin-left", - ($mouseY * 0.01) + 'px');
          $('#cat').css("margin-left", -($mouseX * 0.02) + 'px');
          $('#paintbrush').css("margin-left", - ($mouseY * 0.01) + 'px');
          $('#mouse').css("margin-left", -($mouseX * 0.02) + 'px');

          $('#hearts').css("margin-left", - ($mouseY * 0.01) + 'px');
          $('#rain').css("margin-left", -($mouseX * 0.02) + 'px');
          $('#quotes').css("margin-left", - ($mouseY * 0.01) + 'px');
          $('#lightning').css("margin-left", -($mouseX * 0.02) + 'px');
      });

      if (favorites) {
        this.props.setUsersFavorites(favorites)
      }
    } 
  }

  doSomething = (event) => {
    this.setState({something: !this.state.something});
    
  }

  render() {
    console.log('render from app', this.state)
    const headerID = this.props.searchBarClicked ? 'header-move' : 'header-idle';
      return (
      <div className="App">
        <header className="header-wrapper"
        >
          <div id="coffee"
            // onMouseEnter={(event) => this.doSomething(event)}
          ></div>
          <div id="bulb"></div>
          <div id="hand"></div>
          <div id="cat"></div>
          <div id="thumbsup"></div>
          <div id="robot"></div>
          <div id="music"></div>
          <div id="sunglass"></div>
          <div id="squigley"></div>
          <div id="waves"></div>
          <div id="paintbrush"></div>
          <div id="mouse"></div>
          <div id="hearts"></div>
          <div id="rain"></div>
          <div id="quotes"></div>
          <div id="lightning"></div>
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
