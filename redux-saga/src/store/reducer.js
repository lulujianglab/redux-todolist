import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes'

const defaultState = {
  inputValue: '',
  list: []
}

// reducer 可以接收state，但是绝不能修改state
export default (state = defaultState, action) => {
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state)) // 对之前的state做一次深拷贝
    newState.inputValue = action.value
    return newState
  }
  if (action.type === INIT_LIST_ACTION) {
    const newState = JSON.parse(JSON.stringify(state)) // 对之前的state做一次深拷贝
    newState.list = action.data
    return newState
  }
  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state)) // 对之前的state做一次深拷贝
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  if (action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state)) // 对之前的state做一次深拷贝
    newState.list.splice(action.index, 1) // 找到对应的下标，删除即可
    return newState
  }
  return state
}
