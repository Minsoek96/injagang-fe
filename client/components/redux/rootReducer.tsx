import { combineReducers } from "redux";

import authReducer from "./Auth/reducer";
import signupReducer from "./Join/reducer";
import templateReducer from "./Template/server/reducer";
import interViewQuestionReducer from "./InterViewQuestion/reducer";
import userInterViewListReducer from "./InterViewList/reducer";

import userTemplateReducer from "./Template/user/reducer";
import profileReducer from "./MyProfile/reducer";
import toastReducer from "./Toast/reducer";
import userInterViewQuestionsReducer from "./InterViewQuestion/user/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  template: templateReducer,
  interViewQuestion: interViewQuestionReducer,
  userInterViewList: userInterViewListReducer,
  userTemplaetList: userTemplateReducer,
  profile: profileReducer,
  toast: toastReducer,
  userInterViewQuestions: userInterViewQuestionsReducer,
});

export default rootReducer;
