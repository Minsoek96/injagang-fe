import { combineReducers } from "redux";

import authReducer from "./Auth/reducer";
import signupReducer from "./Join/reducer";
import interViewQuestionReducer from "./InterViewQuestion/reducer";

import profileReducer from "./MyProfile/reducer";
import toastReducer from "./Toast/reducer";
import userInterViewQuestionsReducer from "./InterViewQuestion/user/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  interViewQuestion: interViewQuestionReducer,
  profile: profileReducer,
  toast: toastReducer,
  userInterViewQuestions: userInterViewQuestionsReducer,
});

export default rootReducer;
