#### react-redux 基础模板

```js
import React, { Component } from 'react'

// 需要定义Provider组件和connect方法
class Provider extends Component {

  render() {
    return (
      <div>hello world</div>
    )
  }
}

const connect = (mapStateToProps, mapDispatchToProps) => {

  return (ConnetComponent) => {
    return function  ConnetedComponent (props) {
      return <ConnetComponent {...props}/>
    }
  }
}

export { Provider, connect }
```

具体实现方法 [react-redux-custom.js](https://github.com/lulujianglab/redux-todolist/blob/master/react-redux/src/react-redux-custom.js)
