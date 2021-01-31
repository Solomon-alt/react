import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrder } from '../../store/actions/orders/orders'
import { Button, Input, Space, Table, Tag, Pagination } from 'antd';
import { DownCircleOutlined, EditOutlined } from '@ant-design/icons';

const { Search } = Input;

const Orders = () => {
    let dispatch = useDispatch()
    //获取发请求得到的值============================================================
    let order = useSelector(state => state.orders.orders)
    useEffect(() => {
        //获取初始值===============================================================
        dispatch(getOrder({ pagenum: 1, pagesize: 10, query: '' }))
    }, [])

    //搜索框搜索=============================================================================
    const onSearch = value => {
        console.log(value)
    }

    //分页=================================================================================
 
    let onChange=(page, pageSize) => {
        dispatch(getOrder({ pagenum: page, pagesize: pageSize, query: '' }))
    };

    //上一页下一页
    let itemRender=(current, type, originalElement)=>{
        if (type === 'prev') {
            return '上一页';
          }
          if (type === 'next') {
            return '下一页';
          }
          return originalElement;
    }

    //表格================================================================================
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            align: "center"
        },
        {
            title: '订单编号',
            dataIndex: 'order_number',
            key: 'order_number',
            align: "center"
        },
        {
            title: '订单价格',
            dataIndex: 'order_price',
            key: 'order_price',
            align: "center"
        },
        {
            title: '是否付款',
            key: 'pay_status',
            dataIndex: 'pay_status',
            align: "center",
            render: (text) => (
                text === '0' ? <Tag color="red" >已付款</Tag> : <Tag color="geekblue">未付款</Tag>
            )
        },
        {
            title: '是否发获',
            dataIndex: 'is_send',
            key: 'is_send',
            align: "center"
        },
        {
            title: '下单时间',
            key: 'timer',
            dataIndex: 'timer',
            align: "center",
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            render: () => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} />
                    <Button type="primary" danger icon={<DownCircleOutlined />} />
                </Space>
            ),
        },
    ];

    let data = order.goods;


    return (
        <div>
            {/* 搜索按钮 */}
            <div style={{
                margin: 10
            }}>
                <Space direction="vertical">
                    <Search placeholder="请输入搜索类容" onSearch={onSearch} enterButton />
                </Space >
            </div>
            {/* 表格 */}
            <div>
                <Table columns={columns} dataSource={data} bordered pagination={false} />
            </div>
            {/* 分页 */}
            <div>
                <Pagination
                    total={order.total}
                    showSizeChanger
                    showQuickJumper
                    itemRender={itemRender}
                    onChange={onChange}
                    responsive
                    // pageSizeOptions={5,10,15,30}
                    showTotal={total => `共 ${total} 条`}
                />
            </div>
        </div>
    )
}
export default Orders