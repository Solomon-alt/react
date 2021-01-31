import api from '../../../http/api'
import { message } from 'antd'


//获取角色列表===============================================
export function getroles() {
    return async(dispatch) => {
        let res = await api.getroles()
        if (res.meta.status === 200) {
            res.data.map((item, index) => {
                item.key = index + 1
            })
            console.log(res.data)
            return dispatch({
                type: 'getroles',
                data: res.data
            })
        } else {
            message.error(res.meta.msg)
        }
    }
}


//添加角色=============================================================、
export function addRoles(params) {
    return async(dispatch) => {
        let res = await api.addRoles(params)
        if (res.meta.status === 200) {
            message.success(res.meta.msg)
            return dispatch(getroles())
        } else {
            message.error(res.meta.msg)
        }
    }
}

//删除角色=============================================================、
export function delRole(params) {
    return async(dispatch) => {
        let res = await api.delRole(params)
        if (res.meta.status === 200) {
            message.success(res.meta.msg)
            return dispatch(getroles())
        } else {
            message.error(res.meta.msg)
        }
    }
}

//编辑角色=============================================================、
export function editRole(params) {
    return async(dispatch) => {
        let res = await api.editRole(params)
        if (res.meta.status === 200) {
            message.success(res.meta.msg)
            return dispatch(getroles())
        } else {
            message.error(res.meta.msg)
        }
    }
}


//获取权限列表=========================================================、
export function getPower(params) {
    return async(dispatch) => {
        let res = await api.getPower(params)
        if (res.meta.status === 200) {
            res.data.map((item, index) => {
                item.key = index + 1
            })
            console.log(res.data)
            return dispatch({
                type: 'getPower',
                data: res.data
            })
        } else {
            message.error(res.meta.msg)
        }
    }
}