import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/homepage.component";
import ShopPage from "./components/pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./components/pages/sign-in-and-sign-up/sign-in-and-sign-up";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user.action";

class App extends Component {
  // ---------------------
  // NOTE // ! This constructor is deprecated as we are now using redux instead for this action
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null,
  //   };
  // }
  //----------------------

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // * so basically when a user signs in, we check if that user already exists and if not, we create a new user and return the user id otherwise if the user already exists we return the user id regardless when the user signs out -- we set the current user to null.
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  // * closes the connection when not in use to avoid memory leaks
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* the header is placed outside the routes or switch so that by so doing, the header is always constant */}
        <Header />
        <Routes>
          <Route exact path="/" Component={HomePage} />{" "}
          {/** We only get access to the history properties from the first component that gets passed into our routes, so in the case only homepage right now has access to those properties*/}
          <Route exact path="/shop" Component={ShopPage} />
          <Route exact path="/signIn" Component={SignInAndSignUpPage} />
        </Routes>
      </div>
    );
  }
}

// * we will be using the second argument here because the app.js doesn't do anything with the currentUser in this component but just passes it into the header

const mapDispatchToProps = (dispatch) => ({
  // * dispatch takes the object you pass into it and passes it as an action to every reducer
  // *  invoking 'setCurrentUser' with the user that will then be used as the payload
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
