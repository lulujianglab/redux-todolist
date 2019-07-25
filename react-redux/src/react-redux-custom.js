import React, { Component } from 'react'

// 需要定义Provider组件和connect方法
// 通用Context，外层存放store，内层获取store
const ReduxContext = React.createContext(null)
const ReduxProvider = ReduxContext.Provider

class Provider extends Component {
  constructor(props) {
    super(props)
    const { store } = props
    // 将props中的store存起来，放在context中
    this.state = { store }
  }

  render() {
    return (
      <ReduxProvider value={this.state}>
        {this.props.children}
      </ReduxProvider>
    )
  }
}

const connect = (mapStateToProps, mapDispatchToProps) => {
  // 订阅store中的subscribe，并在每次发生的时候，去重新生成props与执行刷新
  function subscribe({
    store,
    setState,
    dispatchToUse
  }) {
    store.subscribe((e) => {
      // 再一次获取新的props
      const newStateProps = mapStateToProps(store.getState())
      const newEventProps = mapDispatchToProps(dispatchToUse)
      const newMergedProps = Object.assign({}, newStateProps, newEventProps)
      // 对比之前的value与新的value，从而决定是否要刷新，这也是react-redux性能优化的一步
      setState(newMergedProps)
    })
  }

  return (ConnetComponent) => {
    return function ConnetedComponent (props) {
      // 获取最外层provider上的store
      const { store } = React.useContext(ReduxContext) // ReduxProvider的value属性值
      // 传递给mapDispatchToProps的dispatch方法
      const dispatchToUse = (action) => {
        store.dispatch(action)
      }

      const stateProps = mapStateToProps(store.getState())
      const eventProps = mapDispatchToProps(dispatchToUse)
      const mergedProps = Object.assign({}, stateProps, eventProps)
      // 拥有了一个刷新方法，和新的state
      const [processedProps, setState] = React.useState(mergedProps)
      // 订阅刷新
      if (!subscribe.used) {
        subscribe({
          store,
          setState,
          dispatchToUse
        })
        subscribe.used = true
      }
      console.log('mergedProps:', mergedProps)
      return <ConnetComponent {...processedProps}/>
    }
  }
}

export { Provider, connect }