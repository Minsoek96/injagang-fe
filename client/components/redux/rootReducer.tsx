import { combineReducers } from "redux";

import authReducer from "./Auth/reducer";
import signupReducer from "./Join/reducer";


import profileReducer from "./MyProfile/reducer";
import toastReducer from "./Toast/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  profile: profileReducer,
  toast: toastReducer,
});

export default rootReducer;
