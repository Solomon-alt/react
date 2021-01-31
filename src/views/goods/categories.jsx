import React, {useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goodsList } from '../../store/actions/goods/goods'
import { Button, Table, Badge, Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {useAntdTable} from 'ahooks'
import api from '../../http/api'


//用ahooks 建立表格 先安装 cnpm i -S ahooks
//引入import {useAntdTable} from 'ahooks'


const Categories = () => {




    let dispatch = useDispatch()

    let list = useSelector(state => state.goods.list)
    useEffect(() => {
        dispatch(goodsList({ pagenum: 1, pagesize: 10 }))
    }, [])
    //表格==============================================================================================
    let [pagesize,setPagesize]= useState(5)
    let [pagenum,setPagenum]= useState(1)
    let [query,setQuery] = useState('')
    let getTableData=()=>{
        return api.getOrder({pagenum,pagesize,query}).then(res=>{
           return{
               total:res.data.total,
               list:res.data.goods
           }
        }).catch(err=>{
            console.log(err);
        })
    }

    const columns=[
        {
            title: '订单号',
            key: 'order_number',
            dataIndex: 'order_number',
            align: 'center'
        },
        {
            title: '订单价格',
            key: 'order_price',
            dataIndex: 'order_price',
            align: 'center'
        }
    ]

    const { tableProps, search } = useAntdTable(getTableData, {
        defaultPageSize: 5,
        refreshDeps:[] //删除类容页面自动刷新
      });
    


    const data = list.result;


    return (
        <div>
            {/* 按钮 */}
            <div style={{
                marginLeft: 30
            }}>
                <Button type="primary" size='large'>
                    添加分类
                </Button>
            </div>
            {/* 表格 */}
            <div>
               {/* <table columns={columns}  
               {...tableProps} 
               rowkey="id" /> */}
            </div>
        </div>
    )
}
export default Categories