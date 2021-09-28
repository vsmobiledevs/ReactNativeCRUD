import {fork} from 'redux-saga/effects';

import {loginRequest} from './auth-saga/login-saga';
import {signUpRequest} from './auth-saga/signup-saga';

export function* rootSaga() {
  yield fork(loginRequest);
  yield fork(signUpRequest);
}
