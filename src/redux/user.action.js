// * functions that return an object where the object is in the exact format that the action is expected to be

import { UserActionTypes } from "./user/user.type";

// * calling an action that holds the value we were setting 'setState' to in app.js and calling it 'user'
export const setCurrentUser = (user) => ({
  // * the action creation_type(in user.reducer.js) and the reducer's type expectation must be aligned in order to create the appropriate effects in our reducer
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
