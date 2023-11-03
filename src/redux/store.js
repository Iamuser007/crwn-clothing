// import { applyMiddleware } from "redux";
// import logger from "redux-logger";
// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./root-reducer";

// // * the documentation on this code is available on redux documentary
// const middlewares = [logger]; // * any new value can be added to this array
// const disableSerializer = {
//   serialiazableCheck: false,
// };

// // * the store takes in the value of the "rootReducer" and the return value of the "applyMiddleware"
// const store = configureStore(
//   { reducer: rootReducer },
//   applyMiddleware(...middlewares)
// );

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firebase";
import { constants as rfConstants } from "redux-firestore";
import rootReducer from "./root-reducer";
import logger from "redux-logger";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // just ignore every redux-firebase and react-redux-firebase action type
          ...Object.keys(rfConstants.actionTypes).map(
            (type) => `${rfConstants.actionsPrefix}/${type}`
          ),
          ...Object.keys(rrfActionTypes).map(
            (type) => `@@reactReduxFirebase/${type}`
          ),
        ],
        ignoredPaths: ["firebase", "firestore"],
      },
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
    }).concat(logger),
});

export default store;
