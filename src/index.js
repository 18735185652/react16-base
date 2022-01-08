import React from './react';
import ReactDOM from './react-dom';

class ClassComponent extends React.Component {
  render() {
    return (
      <div id='root' className='code' style={{ color: 'red' }}>
        <span>{this.props.name}</span>
        <span>{this.props.children}</span>
      </div>
    )
  }
}

// let element = <FunctionComponent name='hello'>world</FunctionComponent>
let element = React.createElement(ClassComponent, { name: 'hello' }, 'world')

ReactDOM.render(
  element,
  document.getElementById('root')
);


