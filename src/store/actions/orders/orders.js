import api from '../../../http/api'
import { message } from 'antd'
import dayjs from 'dayjs'

// 获得订单列表===========================================================

export function getOrder(params) {
    return async(dispatch) => {
        let res = await api.getOrder(params)
        if (res.meta.status === 200) {
            res.data.goods.map((item, index) => {
                item.key = index + 1
                item.timer = dayjs(item.create_time).format('YYYY-MM-DD  HH:mm:ss')
            })
            console.log(res.data)
            return dispatch({
                type: 'getOrder',
                data: res.data
            })
        } else {
            message.error(res.meta.msg)
        }
    }
}