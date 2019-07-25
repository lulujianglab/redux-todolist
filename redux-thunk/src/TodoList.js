import React, { Component } from 'react';
import store from './store'
import { Input, Button, List } from 'antd'
import { getInputChangeAction, getBtnClickAction, getItemDeleteAction, getInitListAction, getTodoList } from './store/actionCreator';
// import axios from 'axios'

class TodoList extends Component {
  constructor(props) {
    super(props)
    // console.log(store.getState())
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
    store.subscribe(this.handleStoreChange)
  }

  componentDidMount() {
    // axios.get('/api').then((res) => {
    //   // console.log(11,res.data)
    //   const list = res.data.data
    //   const action = getInitListAction(list)
    //   store.dispatch(action)
    // })
    const action = getTodoList()
    store.dispatch(action) // 调用 store.dispatch()这个函数的时候，action这个函数就会被执行
  }

  render () {
    return (
      <div style={{marginTop: '10px', marginLeft: '10px'}}>
        <div>
          <Input value={this.state.inputValue} placeholder='todo info' style={{width: '300px', marginRight: '10px'}} onChange={this.handleInputChange} /> 
          <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
        </div>
        <List
          style={{marginTop: '10px', width: '300px'}}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (<List.Item onClick={() => this.handleItemDelete(index)}>{item}</List.Item>)}
        />
      </div>
    )
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }

  handleStoreChange() {
    this.setState(store.getState())
  }

  handleBtnClick() {
    const action = getBtnClickAction()
    store.dispatch(action)
  }
  handleItemDelete(index) {
    const action = getItemDeleteAction(index)
    store.dispatch(action)
  }
}

export default TodoList;
