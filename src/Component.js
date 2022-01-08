import { compareTwoVdom, findDOM } from './react-dom'
class updater {
    constructor(classInstance) {
        // 类组件的实例
        this.classInstance = classInstance;
        //等待更新的状态
        this.pendingStates = [];
    }
    addState(partialState) {
        this.pendingStates.push(partialState);
        // 触发更新
        this.emitUpdate();
    }
    emitUpdate() {
        this.updateComponent();
    }
    updateComponent() {
        let { classInstance, pendingStates } = this;
        // 长度大于0 说明当前有正在准备更新的分状态
        if (pendingStates.length > 0) {
            this.shouldUpdate(classInstance, this.getState())
        }

    }
    getState() {
        let { classInstance, pendingStates } = this;
        let { state } = classInstance;
        // 用老状态合并新状态
        pendingStates.forEach((partialState) => {
            state = { ...state, ...partialState }
        })
        // 清空数组
        pendingStates.length = 0;
        return state
    }
    shouldUpdate(classInstance, nextState) {
        classInstance.state = nextState;
        classInstance.forceUpdate()
    }
}

export class Component {
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
        this.state = {};
        this.updater = new updater(this)
    }
    setState(partialState) {
        this.updater.addState(partialState);
    }
    // 让类组件强制更新
    forceUpdate() {
        // 获取此组件上一次渲染出来的虚拟DOM
        let oldRenderVdom = this.oldRenderVdom
        // 获取虚拟DOM对应的真实DOM oldRenderVdom.dom
        let oldDOM = findDOM(oldRenderVdom)

        // 重新执行render得到新的虚拟DOM
        let newRenderVdom = this.render();
        // 把老的虚拟DOM和新的虚拟DOM进行对比，对比得到的差异更新真实DOM
        compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom)
        this.oldRenderVdom = newRenderVdom;
    }
}