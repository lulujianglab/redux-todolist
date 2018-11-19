import { takeEvery, put  } from 'redux-saga/effects'
import { GET_INIT_LIST } from './actionTypes'
import { initListAction } from './actionCreator'
import axios from 'axios'

function* getInitList() {
  try {
    const res = yield axios.get('/list.json')
    const action = initListAction(res.data)
    yield put(action)
  } catch(e) {
    console.log('list.json 网络请求失败')
  }
}

// generator 函数
function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList) // takeEvery捕捉每一个派发出来的action type类型为GET_INIT_LIST的时候，就会执行getInitList方法
}

export default mySaga