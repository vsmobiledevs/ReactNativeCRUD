import * as TYPES from '../types';

//Email Validation Action
export const loginRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.LOGIN_REQUEST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Sign up obj Action
export const signUpAction = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SIGNUP_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Save user info Action
export const saveUserInfo = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SAVE_INFO_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
