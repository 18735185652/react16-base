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
    } else if (typeof type === 'function') {
        if (type.isReactComponent) {
            return mountClassComponent(vdom);
        } else {
            return mountFunctionComponent(vdom)
        }
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

function mountFunctionComponent(vdom) {
    // 获取函数本身
    let { type, props } = vdom;
    // 把属性对象传递给函数执行，返回要渲染的虚拟dom
    let renderVdom = type(props);
    // vdom，老的要渲染的虚拟DOM=renderVdom，方便后面的dom-diff 
    renderVdom.oldRenderVdom = renderVdom;
    return createDOM(renderVdom)
}
function mountClassComponent(vdom) {
    let { type: classComponent, props } = vdom;
    let classInstance = new classComponent(props);
    let renderVdom = classInstance.render()
    // 把上一次render渲染得到的虚拟DOM
    vdom.oldRenderVdom = classInstance.oldRenderVdom = renderVdom;
    return createDOM(renderVdom)
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
        } else if (/^on[A-Z].*/.test(key)) {
            dom[key.toLowerCase()] = newProps[key];
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
export function findDOM(vdom) {
    if (!vdom) return null;
    // 如果vdom上有dom属性， 说明这个vdom是一个原生组件span div p
    if (vdom.dom) {
        return vdom.dom;
    } else {
        // 它可能是一个函数组件或者类组件
        let oldRenderVdom = vdom.oldRenderVdom;
        return findDOM(oldRenderVdom)
    }
}

/**
 * 进行DOM-DIFF 对比
 * @param {*} parentDOM  父真实DOM节点
 * @param {*} oldVdom   老的虚拟DOM
 * @param {*} newVdom   新的虚拟DOM 
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
    console.log('parentDOM: ', parentDOM);
    // 获取老的真实DOM
    let oldDOM = findDOM(oldVdom);
    let newDOM = createDOM(newVdom);
    parentDOM.replaceChild(newDOM, oldDOM)
}
const ReactDom = {
    render,
    compareTwoVdom,
    findDOM,

}

export default ReactDom;