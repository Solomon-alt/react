//相当于mutation
let initState = {
        menus: [],
        users: [],
    } //state 初始值


//action 是一个对象 分别为type 一个是data userReducer自己取的名字
export default function userReducer(state = initState, action) {
    switch (action.type) {
        //注册=======================================================
        case 'login':
            return {
                ...state
            }
            //左侧菜单栏==================================================
        case 'getMenus':
            return {
                ...state,
                menus: action.data //menus初始值为一个空数组这里将action.data赋值给menus
            }
            //用户数据列表================================================
        case 'getUsers':
            return {
                ...state,
                users: action.data
            }

            // 修改用户状态================================================================
        case 'modifyUsers':
            return {
                ...state,
            }
            //添加单个用户=============================================================================
        case 'addUser':
            return {
                ...state,
            }
            // 删除单个用户================================================================
        case 'delUser':
            return {
                ...state
            }
            //编辑单个用户=================================================================
        case 'editUser':
            return {
                ...state
            }
        default:
            return {
                ...state,
            }

    }
}