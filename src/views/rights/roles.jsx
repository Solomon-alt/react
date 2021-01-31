import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getroles, delRole, editRole,addRoles } from '../../store/actions/rights/rights'
import { Button, Table, Space, Modal, message, Form, Input, Checkbox } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;



const Roles = () => {
    let dispatch = useDispatch()
    let [ids, setIds] = useState('') //编辑角色用到的id
    let roles = useSelector(state => state.rights.roles)
    useEffect(() => {
        dispatch(getroles())
    }, [])

    const [form] = Form.useForm() //
    //表格==================================================================================
    const columns = [
        { title: '#', dataIndex: 'key', key: 'key', align: "center" },
        { title: '职位', dataIndex: 'roleName', key: 'roleName', align: "center" },
        { title: '描述', dataIndex: 'roleDesc', key: 'roleDesc', align: "center" },
        {
            title: '操作',
            key: 'id',
            align: "center",
            render: (text) => (
                <Space size="small">
                    <Button type="primary" onClick={() => showModal(text)}>编辑</Button>
                    <Button onClick={() => showConfirm(text)} type="primary" danger>删除</Button>
                    <Button type="primary" type="dashed">分配权限</Button>
                </Space>
            ),
        },
    ];

    const data = roles

    // 删除角色==============================================================
    function showConfirm(text) {
        confirm({
            title: '此操作将永久删除该角色，是否继续?',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                console.log(text);
                dispatch(delRole({ id: text.id }))
            },
            onCancel() {
                message.info('您取消了删除')
            },
        });
    }


    //编辑=======================================================================================
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (text) => {
        setIsModalVisible(true);
        setIds(text.id)
        form.setFieldsValue({
            roleName: text.roleName
        })
    };
    // 弹出框取消按钮
    let cancelText = () => {
        setIsModalVisible(false);
        message.info('您取消了编辑')
    }

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    //发请求=============================================================================================
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(ids);
        dispatch(editRole({
            id: ids,
            roleName: values.roleName,
            roleDesc: values.roleDescribe
        }))
        form.resetFields()
        setIsModalVisible(false);
    };


    //添加角色=============================================================================================================
    const [visible, setVisible] = useState(false);

    const showModal1 = () => {
        setVisible(true);
    };


    const onFinished = (values) => {
        console.log('Success:', values);
        dispatch(addRoles({ 
            roleName:values.rolesName,
            roleDesc:values.roleDesc
        }))
        setVisible(false);
        form.resetFields()
    };

    //取消按钮=====================================================================================================
    let back=()=>{
        setVisible(false); 
        form.resetFields()
    }



    return (
        <div>
            {/* 按钮 */}
            <Button type="primary" size="large" onClick={showModal1}>
                添加角色
            </Button>

            {/* 添加角色弹出框 */}

            <Modal title="添加角色" visible={visible} footer={null} closable={false} >

                <Form
                    {...layout}
                    form={form}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinished}
                    validateTrigger="onBlur"
                >
                    <Form.Item
                        label="角色名"
                        name="rolesName"
                        rules={[
                            {
                                required: true,
                                message: '角色名不能为空',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="角色描述"
                        name="roleDesc"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item >
                    <div style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <div><Button block onClick={back}>取消</Button></div>
                            <div><Button type="primary" htmlType="submit">确定</Button></div>
                        </div>
                    </Form.Item>
                </Form>

            </Modal>

            {/* 表格 */}
            <Table
                style={{
                    marginTop: 30
                }}
                columns={columns}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                }}
                dataSource={data} keyboard closable
            />,

            {/* 编辑弹出框 ========================================*/}
            <Modal title="编辑角色" visible={isModalVisible} closable={false} footer={null} >
                <Form
                    form={form}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    validateTrigger="onBlur"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="角色名"
                        name="roleName"
                        rules={[
                            {
                                required: true,
                                message: '角色名不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="角色描述"
                        name="roleDescribe"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <div><Button block onClick={cancelText}>取消</Button></div>
                            <div><Button type="primary" htmlType="submit">确定</Button></div>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default Roles