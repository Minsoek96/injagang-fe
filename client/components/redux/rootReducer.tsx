import { combineReducers } from "redux";

import authReducer from "./Auth/reducer";
import signupReducer from "./Join/reducer";


import profileReducer from "./MyProfile/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  profile: profileReducer,
});

export default rootReducer;
