// NOTE // ! This code is deprecated because after the code worked, i wasn't getting the logger and was getting an error instead, so i replace the code with the one i got from the redux docs and after which i was getting the logger but only the logger from the snapShot which is fine because that is the important one. However i'm also getting 21 warnings in the terminal and the console is flooded with serializer errors. Now it is bad practice to disable the serializerCheck but the errors in the console and warnings in the terminal annoys me. So in future updates by God's grace, i plan to write a more stable code without these errors and warnings.
///////////////////////////////////////
// import { applyMiddleware } from "redux";
// import logger from "redux-logger";
// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./root-reducer";

// // * the documentation on this code is available on redux documentary
// const middlewares = [logger]; // * any new value can be added to this array
// const disableSerializer = {
//   serialiazableCheck: false,
// };

//  * the store takes in the value of the "rootReducer" and the return value of the "applyMiddleware"
// const store = configureStore(
//   { reducer: rootReducer },
//   applyMiddleware(...middlewares)
// );

// export default store;
//////////////////////////////////////////////

import { configureStore } from "@reduxjs/toolkit";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firebase";
import { constants as rfConstants } from "redux-firestore";
import rootReducer from "./root-reducer";
import logger from "redux-logger";
import { persistStore } from "redux-persist";

export const store = configureStore({
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

export const persistor = persistStore(store);
