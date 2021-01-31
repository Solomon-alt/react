import api from '../../../http/api'
import { message } from 'antd'
import { authRoutes, parentRoutes } from '../../../router'


//导出多个方法
export function login(params) {
    //发请求
    return async(dispatch) => {
        let res = await api.login(params)
        if (res.meta.status === 200) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', JSON.stringify(res.data))
            window.location.pathname = "/" //跳路由  会刷新页面
            message.success('登陆成功')
                //提交reducers
            dispatch({
                type: 'login'
            })
        }
    }

}

//侧边栏请求===========================================================================
export function getMenus() {
    return async dispatch => {
        let res = await api.getMenus()
        if (res.meta.status === 200) {
            res.data.map(item => {
                parentRoutes.map(item1 => {
                    if (item1.path === ('/' + item.path)) {
                        item.icon = item1.icon
                    }
                })
                if (item.children && item.children.length) {
                    item.children.map(child => {
                        authRoutes.map(item2 => {
                            if ((`/${item.path}/${child.path}`) === item2.path) {
                                child.icon = item2.meta.icon
                                child.key = `/${item.path}/${child.path}`
                            }
                        })
                    })
                }
            })
            res.data.unshift({
                path: '/',
                key: '/',
                authName: '首页',
                icon: 'HomeOutlined'
            })
            return dispatch({
                type: 'getMenus',
                data: res.data
            })
        }
    }
}
//用户数据列表============================================================================
export function getUsers(params) {
    return async(dispatch) => {
        let res = await api.getUsers(params)
        if (res.meta.status === 200) {
            res.data.users.map((item, index) => {
                item.key = index + 1
            })
            console.log(res.data);
            return dispatch({
                type: 'getUsers',
                data: res.data
            })
        } else {
            message.error(res.meta.msg)
        }
    }
}

//修改用户状态================================================================
export function modifyUsers(params) {
    return async(dispatch) => {
        let res = await api.modifyUsers(params)
        if (res.meta.status === 200) {
            message.success(res.meta.msg)
            return dispatch({
                type: 'modifyUsers',
            })
        } else {
            message.error(res.meta.msg)
        }
    }
}
//删除单个用户================================================================
export function delUser(params) {
    return async(dispatch) => {
        let res = await api.delUser(params)
        if (res.meta.status === 200) {
            message.success(res.meta.msg)
            return dispatch(getUsers(params))
        } else {
            message.error(res.meta.msg)
        }
    }
}
//添加单个用户==================================================================
export function addUser(params) {
    return async(dispatch) => {
        let res = await api.addUser(params)
        if (res.meta.status === 201) {
            message.success(res.meta.msg)
            console.log(res.data)
            return dispatch(getUsers(params))
        } else {
            message.error(res.meta.msg)
        }
    }
}
//编辑单个用户==================================================================
export function editUser(params) {
    return async(dispatch) => {
        let res = await api.editUser(params)
        if (res.meta.status === 200) {
            console.log(res.data)
            message.success(res.meta.msg)
            return dispatch({
                type: 'editUser'
            })
        } else {
            message.error(res.meta.msg)
        }
    }
}