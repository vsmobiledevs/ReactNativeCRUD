import * as TYPES from "../../actions/types";

const initialState = {
 loading: false,
 isKeepLogin: null,
 signupRes: {},
 error: null,
 isSuccess: false,
 isFailure: false,
};
const authReducer = (state = initialState, actions) => {
 switch (actions.type) {
  case TYPES.CONFIRM_EMAIL_REQUEST:
   return {
    ...state,
    loading: true,
    signupRes: null,
    isKeepLogin: false,
    isSuccess: false,
    isFailure: false,
   };
  case TYPES.CONFIRM_EMAIL_SUCCESS:
   return {
    ...state,
    loading: false,
    signupRes: actions.data,
    isKeepLogin: true,
    isSuccess: true,
    isFailure: false,
   };
  case TYPES.CONFIRM_EMAIL_FAILURE:
   return {
    ...state,
    loading: false,
    signupRes: null,
    error: actions.error,
    isKeepLogin: false,
    isSuccess: false,
    isFailure: true,
   };
  case TYPES.SAVE_USER_PHOTO:
   return {
    ...state,
    signupRes: {
     ...state.signupRes,
     ProfileBlobURl: actions.data,
    },
   };
  case TYPES.SET_PROFILE_DATA:
   return {
    ...state,
    signupRes: {
     ...state.signupRes,
     ...actions.data,
    },
   };
  default:
   return state;
 }
};
export default authReducer;
