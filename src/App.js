import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/homepage.component";
import ShopPage from "./components/pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./components/pages/sign-in-and-sign-up/sign-in-and-sign-up";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      createUserProfileDocument(user);

      console.log(user);
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
        <Header currentUser={this.state.currentUser} />
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

export default App;
