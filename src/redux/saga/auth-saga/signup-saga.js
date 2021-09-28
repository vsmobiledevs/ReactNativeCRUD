import {put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actions/types';

export function* signUpRequest() {
  yield takeLatest(types.SIGNUP_REQUEST, signUp);
  yield takeLatest(types.SAVE_INFO_REQUEST, saveInfo);
}

function* signUp(params) {
  console.log('[signUp-saga]', params);
  try {
    let response = yield;
    console.log('[signUp-saga response]', response);
    if (response) {
      const {uid} = response.user;
      params.cbSuccess(response, uid);
      yield put({type: types.SIGNUP_SUCCESS, data: uid});
      //  yield put({type: types.SAVE_INFO_REQUEST, data: response.user});
    } else {
      params.cbFailure(response.message);
    }
  } catch (error) {
    params.cbFailure(error.message);
    yield put({type: types.SIGNUP_FAILURE, error: 'Network Error'});
  }
}

function* saveInfo(params) {
  // console.log('[signUp-saga]', params);
  try {
    let response = yield;
    params.cbSuccess(response);
    yield put({type: types.SAVE_INFO_SUCCESS, data: ''});
  } catch (error) {
    params.cbFailure(error.message);
    yield put({type: types.SAVE_INFO_FAILURE, error: 'Network Error'});
  }
}
