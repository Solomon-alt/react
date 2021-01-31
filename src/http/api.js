import http from './index'
export default {
    //登录====================================================================
    login({ username, password }) {
        return http.post('login', {
            username,
            password
        })
    },
    //左侧菜单===================================================================
    getMenus() {
        return http.get('menus')
    },
    //获得用户数据列表=================================================================
    getUsers({ query, pagenum, pagesize }) {
        if (query) {
            return http.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
        } else {
            return http.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}`)
        }
    },
    //修改用户状态===========================================================================
    modifyUsers({ uId, type }) {
        return http.put(`users/${uId}/state/${type}`)
    },
    //添加用户=========================================================================
    addUser({ username, password, email, mobile }) {
        if (email || mobile) {
            return http.post("users", {
                username,
                password,
                email,
                mobile
            })
        } else {
            return http.post("users", {
                username,
                password,
            })
        }
    },
    //编辑单个用户=======================================================================
    editUser({ id, email, mobile }) {
        if (email || mobile) {
            return http.put(`users/${id}`, { email, mobile })
        } else {
            return http.put(`users/${id}`)
        }
    },
    //删除单个用户=======================================================================
    delUser({ id }) {
        return http.delete(`users/${id}`)
    },


    //获取角色列表===============================================================
    getroles() {
        return http.get(`roles`)
    },
    //添加角色===================================================================
    addRoles({ roleName, roleDesc }) {
        return http.post('roles', {
            roleName,
            roleDesc
        })
    },
    //删除角色==================================================================
    delRole({ id }) {
        return http.delete(`roles/${id}`)
    },
    //编辑角色==================================================================
    editRole({ id, roleName, roleDesc }) {
        return http.put(`roles/${id}`, { roleName, roleDesc })
    },

    //获得权限列表=============================================================
    getPower({ type }) {
        return http.get(`rights/${type}`)
    },
    //获取商品列表======================================================================
    getGoods({ query, pagenum, pagesize }) {
        return http.get(`goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //删除商品=======================================================================
    delGoods({ id }) {
        return http.delete(`goods/${id}`)
    },
    //--------------------------------------------------------------------------------------------------
    //商品分类
    goodsList({ type, pagenum, pagesize }) {
        if (pagenum && pagesize) {
            return http.get(`categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`)
        } else {
            return http.get(`categories?type=${type}`)
        }
    },
    //获取订单列表======================================================================
    getOrder({ query, pagenum, pagesize, }) {
        return http.get(`orders?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //基于时间统计的折线图==============================================
    getData() {
        return http.get(`reports/type/1`)
    }
}