import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION  } from './actionTypes'
import axios from 'axios'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const getBtnClickAction = () => ({
  type: ADD_TODO_ITEM
})

export const getItemDeleteAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
})

export const getInitListAction = (list) => ({
  type: INIT_LIST_ACTION,
  list
})

export const getTodoList = () => {
  return (dispatch) => {
    axios.get('/api').then((res) => {
      const list = res.data.data
      const action = getInitListAction(list)
      console.log(action)
      dispatch(action) // actionCreactor里边并没有store这个仓库，实际上，当你调用getTodoList内容是函数的action时，这个函数能够接收到store的dispatch方法
    })
  }
}