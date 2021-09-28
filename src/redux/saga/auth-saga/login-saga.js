import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';

export function* loginRequest() {
  yield takeLatest(types.LOGIN_REQUEST_REQUEST, login);
}

function* login(params) {
  console.log('[login saga]', params);
  try {
    let response = yield;
    console.log('response - - - > >> > ', response);
    params.cbSuccess(response);
    yield put({type: types.LOGIN_REQUEST_SUCCESS, data: response.user});
  } catch (error) {
    console.log('error from login request saga -- > > >  > ', error);
    params.cbFailure(error.message);
    yield put({type: types.LOGIN_REQUEST_FAILURE, data: error.message});
  }
}
