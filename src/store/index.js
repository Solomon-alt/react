import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' //发请求
import user from './reducers/user/user' // 引入reducers下的user.js文件
import rights from './reducers/rights/rights' // 引入reducers下的rights.js文件
import orders from './reducers/orders/orders'
import data from './reducers/data/data'
import goods from './reducers/goods/goods'

// createStore创建一个store对象
// Reducers等同于mutations
// applyMiddleware使用中间件
//只有引入thunk才能发请求
// combineReducers 合并 将几个模块合并成一个 相当于modules

//发请求第一步第二部是到src文件夹下的index.js


const store = createStore(combineReducers({
    user,
    rights,
    orders,
    data,
    goods,
}), applyMiddleware(thunk))

export default store
// 导出后 到index.js导入