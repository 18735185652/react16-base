import { REACT_TEXT } from './constants'

function render(vdom, container) {
    mount(vdom, container)
}
/**
 * 把虚拟dom转换成真实dom插入容器
 * @param {} vdom 
 * @param {*} container 
 */
function mount(vdom, container) {
    console.log('vdom: ', vdom);
    let newDom = createDOM(vdom)
    container.appendChild(newDom)
}
function createDOM(vdom) {
    let { type, props } = vdom;
    console.log('type: ', type);
    let dom; // 真实dom
    if (type === REACT_TEXT) {
        // debugger
        dom = document.createTextNode(props)
    
    } else {
        dom = document.createElement(type)
    }
    if (props) {
        updateProps(dom, null, props);
        const children = props.children;
        if (typeof children === 'object' && children.type) {
            mount(children, dom)
        } else if (Array.isArray(children)) {
            reconcileChildren(children, dom)
        }
    }
    vdom.dom = dom;
    return dom
}

function reconcileChildren(children, parentDom) {
    children.forEach((child, index) => {
        mount(child, parentDom)
    })
}
/**
 * 更新DOM的属性
 * @param {*} dom 
 * @param {*} oldProps 
 * @param {*} newProps 
 */
function updateProps(dom, oldProps = {}, newProps) {
    for (let key in newProps) {
        if (key === 'children') {
            continue;
        } else if (key === 'style') {
            let styleObj = newProps[key];
            for (let attr in styleObj) {
                dom.style[attr] = styleObj[attr];
            }
        } else {
            dom[key] = newProps[key] // dom.className = 'title' dom.id ='title'
        }
    }
    // 如果属性在老的属性离有，新的属性没有 需要从真实DOM中删除
    for (let key in oldProps) {
        if (newProps.hasOwnProperty(key)) {
            dom[key] = null;
        }
    }
}

const ReactDom = {
    render
}

export default ReactDom;