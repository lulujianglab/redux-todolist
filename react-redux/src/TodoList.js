import React from 'react'
// import { connect } from 'react-redux'
import { connect } from './react-redux-custom'
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreator'

// 无状态组件是一个函数，接收一个props参数
const TodoList = (props) => {
  const { inputValue, list, handleInputChange, handleClick, handleDelete } = props

  return (
    <div>
      <div>
        <input value={inputValue} onChange={handleInputChange} />
        <button onClick={handleClick}>提交</button>
      </div>
      <ul>
        {
          (list || []).map((item, index) => {
            return (
              <li onClick={(index) => handleDelete(index)} key={index}>{item}</li>
            )
          })
        }
      </ul>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange(e) {
      const action = getInputChangeAction(e.target.value)
      dispatch(action)
    },

    handleClick() {
      const action = getAddItemAction()
      dispatch(action)
    },

    handleDelete(index) {
      const action = getDeleteItemAction(index)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)