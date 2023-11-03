import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/084 crown.svg";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

// NOTE // * one connect is caps 'Connect' and the second is lower-case 'connect' so you want to use the lower case in this context
import { connect } from "react-redux"; //todo Refer to the notes.txt

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          Sign Out
        </div>
      ) : (
        <Link className="option" to="/signin">
          Sign In
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

// NOTE // * we use the 'mapStateToProps' and the 'connect' whenever we need properties from the reducer

// * the first parameter of the connect function grants access to the root_reducer state

// * the name can be anything but this name used is common_practice in the redux codebase
// * the state in the function is the top level root_reducer
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  // * from root reducer -> get the user value (from root-reducer.js) -> then get the currentUser(from user.reducer.js)
  currentUser,
  hidden,
});

export default connect(mapStateToProps)(Header);
