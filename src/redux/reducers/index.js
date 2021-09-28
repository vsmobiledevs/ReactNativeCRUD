import {combineReducers} from "redux";

import loginReducer from "./auth-reducers/login-reducer";
import signUpReducer from "./auth-reducers/signup-reducer";

let rootReducer;
export default rootReducer = combineReducers(
 Object.assign({
  signup: signUpReducer,
  login: loginReducer,
 })
);
