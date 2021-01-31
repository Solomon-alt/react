import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPower } from '../../store/actions/rights/rights'
import { Table, Tag } from 'antd';


const Rights = () => {
    let right = useSelector(state => state.rights.power)
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            align: 'center'
        },
        {
            title: '权限名称',
            dataIndex: 'authName',
            key: 'authName',
            align: 'center'
        },
        {
            title: '权限等级',
            dataIndex: 'level',
            key: 'level',
            align: 'center',
            render: (level) => (
                level === '0' ? <Tag color="magenta">一级</Tag> : (level === '1' ? <Tag color="lime">二级</Tag> : <Tag color="purple">三级</Tag>)
            ),
        },
    ];

    const data = right
    
    let dispatch = useDispatch()
    const type = "list"
    useEffect(() => {
        dispatch(getPower({ type: type }))
    }, [])
    return (
        <div
            style={{
                padding: 10,
                margin: 10,
            }}>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    )
}
export default Rights