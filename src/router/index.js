//配置路由
import Home from '../views/home/home'
import Login from '../views/login/login'
import NotFound from '../views/404/404'
import Users from '../views/users/users'
import Roles from '../views/rights/roles'
import Rights from '../views/rights/rights'
import Goods from '../views/goods/goods'
import Params from '../views/goods/params'
import Categories from '../views/goods/categories'
import Orders from '../views/orders/orders'
import Reports from '../views/reports/reports'

//有权限 登录后才能访问
export const authRoutes = [{
    path: '/',
    component: Home,
    exact: true, //是否精准匹配
    meta: {
        title: '首页',
        icon: 'HomeOutlined'
    }
}, {
    path: '/users/users',
    component: Users,
    exact: true, //是否精准匹配
    meta: {
        title: '用户列表',
        icon: 'FolderOpenOutlined'
    }
}, {
    path: '/rights/roles',
    component: Roles,
    exact: true, //是否精准匹配
    meta: {
        title: '角色列表',
        icon: 'FolderOutlined'
    }
}, {
    path: '/rights/rights',
    component: Rights,
    exact: true, //是否精准匹配
    meta: {
        title: '权限列表',
        icon: 'BarcodeOutlined'
    }
}, {
    path: '/goods/goods',
    component: Goods,
    exact: true, //是否精准匹配
    meta: {
        title: '商品列表',
        icon: 'AimOutlined'
    }
}, {
    path: '/goods/params',
    component: Params,
    exact: true, //是否精准匹配
    meta: {
        title: '分类参数',
        icon: 'BellOutlined'
    }
}, {
    path: '/goods/categories',
    component: Categories,
    exact: true, //是否精准匹配
    meta: {
        title: '商品分类',
        icon: 'InsertRowAboveOutlined'
    }
}, {
    path: '/orders/orders',
    component: Orders,
    exact: true, //是否精准匹配
    meta: {
        title: '订单列表',
        icon: 'CopyOutlined'
    }
}, {
    path: '/reports/reports',
    component: Reports,
    exact: true, //是否精准匹配
    meta: {
        title: '订单列表',
        icon: 'AlibabaOutlined'
    }
}]


//没权限
export const commomRoutes = [{
    path: '/login',
    component: Login,
    exact: true, //是否精准匹配
    meta: {
        title: '登录'
    }
}, {
    path: '/404',
    component: NotFound,
    exact: true, //是否精准匹配
    meta: {
        title: '错误'
    }
}]


//一级目录
export const parentRoutes = [{
        path: '/users',
        icon: 'UserOutlined'
    },
    {
        path: '/rights',
        icon: 'FolderOutlined'
    },
    {
        path: '/goods',
        icon: 'AccountBookOutlined'
    },
    {
        path: '/orders',
        icon: 'OrderedListOutlined'
    },
    {
        path: '/reports',
        icon: 'MailOutlined'
    }
]