import * as TYPES from "../../actions/types";

const initialState = {
 loading: false,
 userProfile: null,
 isLoggedIn: false,
 error: null,
 isSuccess: false,
 isFailure: false,
};
const loginReducer = (state = initialState, actions) => {
 switch (actions.type) {
  case TYPES.LOGIN_REQUEST_REQUEST:
   return {
    ...state,
    loading: true,
    // userProfile: actions.user,
    // isSuccess: true,
    // isFailure: false
   };
  case TYPES.LOGIN_REQUEST_FAILURE:
   return {
    ...state,
    loading: false,
    userProfile: null,
    error: actions.error,
    isLoggedIn: false,
    isSuccess: false,
    isFailure: true,
   };
  case TYPES.LOGIN_REQUEST_SUCCESS:
   return {
    ...state,
    loading: false,
    userProfile: actions.user,
    isLoggedIn: true,
    isSuccess: true,
    isFailure: false,
   };
  default:
   return state;
 }
};
export default loginReducer;
