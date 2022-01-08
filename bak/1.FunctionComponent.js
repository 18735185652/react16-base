import React from './react';
import ReactDOM from './react-dom';

// const element = <div id='root' className='code' style={{ color: 'red' }}>
//   hello
// </div>
/**
 * 函数组件
 * 1. 必须接收一个props对象，并返回一个React元素
 * 2. 函数组件的名称必须是大写的开头
 * 3. 必须先定义在使用
 * 4. 函数组件能且只能返回一个根节点
 * 5. React元素不但可以是DOM标签字符串，也可以是一个函数
 */
function FunctionComponent(props) {
  return (
    <div id='root' className='code' style={{ color: 'red' }}>
      <span>{props.name}</span>
      <span>{props.children}</span>
    </div>
  )
}

// let element = <FunctionComponent name='hello'>world</FunctionComponent>
let element = React.createElement(FunctionComponent, { name: 'hello' }, 'world')

/**
  $$typeof: Symbol(react.element)
  key: null 后面在DOM-DIFF的处理元素移动 提高DIFF性能
  props: {className: 'title', style: {…}, children: Array(3)}
  ref: null   通过ref获取此虚拟DOM对应的真实DOM
  type: "h1"  元素的类型 tagName
 */
ReactDOM.render(
  element,
  document.getElementById('root')
);


