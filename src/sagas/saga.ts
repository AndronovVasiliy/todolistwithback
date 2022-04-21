import { put, PutEffect, takeEvery, call, CallEffect } from 'redux-saga/effects'
import { loginApi } from '../api/authApi'

// function* sagaWorkerAuth (): Generator<CallEffect<any> | 1, void, unknown> {
//     const a = yield call(loginApi.me)
//     yield 1
// }


// export function* sagaWatcher () {
//     yield takeEvery("GET_AUTH", sagaWorkerAuth)
// }

function* loadBasicData () {

}


function* sagaWorkerAuth (): Generator<CallEffect<any> | 1, void, unknown> {
    const a = yield call(loginApi.me)
    yield 1
}

export function* rootSaga () {
    const sagas = [loadBasicData]
}