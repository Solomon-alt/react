import api from '../../../http/api'
import { message } from 'antd'
import echarts from 'echarts'

//基于时间统计的折线图==============================================
export function getData() {
    return async(dispatch) => {
        let res = await api.getData()
        if (res.meta.status === 200) {
            console.log(res.data);
            let myChart = echarts.init(document.getElementById('myChart'))
            myChart.setOption(res.data)
            return dispatch({
                type: 'getData',
                data: res.data
            })
        } else {
            message.error(res.meta.msg)
        }
    }
}