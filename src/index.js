import React from './react';
import ReactDOM from './react-dom';

const element = <div id='root' className='code' style={{ color: 'red' }}>
  hello
</div>
console.log('element: ', element);


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


