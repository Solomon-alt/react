import api from '../../../http/api'
import { message } from 'antd'
import dayjs from 'dayjs'

//获取商品列表=================================================
export function getGoods(params) {
    return async(dispatch) => {
        let res = await api.getGoods(params)
        if (res.meta.status === 200) {
            res.data.goods.map((item, index) => {
                item.key = index + 1;
                item.timer = dayjs(item.add_time).format('YYYY-MM-DD  HH:mm:ss')
            })
            return dispatch({
                type: 'getGoods',
                data: res.data
            })
        } else {
            message.error(res.meta.msg)
        }
    }
}
//删除商品=============================================================
export function delGoods(params) {
    return async(dispatch) => {
        let res = await api.delGoods(params)
        if (res.meta.status === 200) {
            message.success(res.meta.msg)
            console.log(res.data);
            return dispatch(getGoods(params))
        } else {
            message.error(res.meta.msg)
        }
    }
}
//获取商品分类列表=================================================
export function goodsList(params) {
    return async(dispatch) => {
        let res = await api.goodsList(params)
        if (res.meta.status === 200) {
            res.data.result.map((item, index) => {
                item.key = index + 1;
                if (item.children && item.children.length) {
                    item.children.map((child, index1) => {
                        child.key = index1 + 1
                    })
                }
            })

            console.log(res.data)
            return dispatch({
                type: 'goodsList',
                data: res.data
            })
        } else {
            message.error(res.meta.msg)
        }
    }
}