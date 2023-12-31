import React, { Component } from "react";
import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      console.error("Passwords don't match ");
      return;
    }

    try {
      // * the method below comes from the auth library
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // NOTE //todo Never forget to use 'await' when waiting for a response from a server
      await createUserProfileDocument(user, { displayName });

      // * this will clear the form once the user clicks the submit button
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error occured why creating a new user", err.message);
    }
  };

  // handleChange = (event) => {
  //   const { name, value } = event.target;

  //   try {
  //     this.setState({ [name]: value });
  //   } catch (err) {
  //     console.error(err);
  //   }

  handleChange = async (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I don't have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit"> Sign Up </CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
