import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, modifyUsers, delUser, addUser, editUser } from '../../store/actions/user/user'
import { Card, Input, Space, Button, Table, Switch, Popconfirm, message, Modal, Form, } from 'antd';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons'

const { Search } = Input;



const Users = () => {

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    let dispatch = useDispatch()
    let users = useSelector(state => state.user.users)
    let [ids, setIds] = useState('')
    let [pagenum] = useState('1')
    let [pagesize] = useState('5')
    let [query] = useState('')

    useEffect(() => {
        dispatch(getUsers({ pagenum, pagesize, query }))
    }, [])
    //搜索框中的值===============================================================
    const onSearch = (value) => {
        dispatch(getUsers({
            pagenum,
            pagesize,
            query: value
        }))
    };

    //添加用户============================================================

    const [isModalVisible, setIsModalVisible] = useState(false);


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalVisible(false);
    };

    const [form] = Form.useForm() //重置表单里的值=========================================================

    let onFinish = (value) => {
        console.log(value);
        dispatch(addUser({
            username: value.username,
            password: value.password,
            email: value.email,
            mobile: value.mobile,
            pagenum: pagenum,
            pagesize: pagesize,
            query: query
        }))
        setIsModalVisible(false)
        form.resetFields()
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
        },
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'id',
            align: 'center',
        },
        {
            title: '角色',
            dataIndex: 'role_name',
            key: 'id',
            align: 'center',
        },
        {
            title: '电话',
            dataIndex: 'mobile',
            key: 'id',
            align: 'center',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'id',
            align: 'center',
        },
        {
            title: '状态',
            key: 'id',
            align: 'center',
            render: (user) => (
                <Switch defaultChecked={user.mg_state} onChange={(e) => onChange(user, e)} />
            )
        },
        {
            title: '操作',
            key: 'id',
            align: 'center',
            render: (text) => (
                <Space size="middle">

                    {/* 编辑用户 */}
                    <Button type="primary" icon={<EditOutlined />} onClick={() => edit(text)}></Button>
                    {/* 删除按钮 */}
                    <Popconfirm
                        title="此操作将永久删除该角色, 是否继续??"
                        onConfirm={() => confirm(text)}
                        onCancel={cancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a href="#">
                            <Button type="danger" icon={<DeleteOutlined />}></Button>
                        </a>
                    </Popconfirm>
                    <Button type="text" icon={<SettingOutlined />}></Button>
                </Space>
            ),
        },

    ];

    //编辑角色=========================================================================

    const [visible, setVisible] = useState(false);

    let edit = (text) => {
        console.log(text);
        setIds(text.id)
        setVisible(true);
        form.setFieldsValue({
            user: text.username,
            emails: text.email,
            phone: text.mobile
        })
    }


    const canceled = () => {
        setVisible(false);
    };

    let onSure = (value) => {
        dispatch(editUser({
            id: ids,
            email: value.emails,
            mobile: value.phone,
        }))
        setVisible(false);
    }

    //修改状态========================================================================
    let onChange = (user, e) => {
        dispatch(modifyUsers({
            uId: user.id,
            type: e
        }))
    }
    //确认删除===============================================================================
    function confirm(text) {
        console.log(text);
        dispatch(delUser({
            id: text.id,
            pagenum: pagenum,
            pagesize: pagesize,
            query: query
        }))
    }

    function cancel() {
        message.info('取消删除')
    }

    let data = users.users

    let back = () => {
        setVisible(false);
    }

    let comeBack = () => {
        setIsModalVisible(false);
    }
    return (
        <div>
            <Card style={{
                width: '100%',
            }}>
                <div>
                    {/* 搜索框 */}
                    <Space direction="vertical">
                        <Search placeholder="请输入搜索内容" allowClear onSearch={onSearch} style={{ width: 400 }} />
                    </Space>,

                {/* 按钮 */}
                    <Button type="primary" className="pr" onClick={showModal} style={{
                        top: '5px',
                        left: 30
                    }}>
                        添加用户
                     </Button>
                </div>
            </Card>,

            {/* 添加用户弹出的Modal框 */}
            <Modal title="添加用户" okText="确定" cancelText="取消" footer={false} visible={isModalVisible} onCancel={handleCancel}>
                <Form
                    form={form}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    validateTrigger="onBlur"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '用户名不能为空' },
                        {
                            type: "string",
                            message: "请输入正确的用户名",
                            trigger: "blur",
                            transform(value) {
                                if (! /^[a-zA-Z0-9]{6,16}$/.test(value)) {
                                    return true;
                                }
                            },
                        },
                    ]}
                    >
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '密码不能为空' },
                        {
                            type: "string",
                            message: "请输入正确的密码",
                            trigger: "blur",
                            transform(value) {
                                if (/^[0-9A-Za-z_-]{6-16}$/.test(value)) {
                                    return true;
                                }
                            },
                        },]}
                    >
                        <Input.Password allowClear />
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[{ required: true, message: '邮箱不能为空' },
                        {
                            type: "string",
                            message: "请输入正确的邮箱",
                            trigger: "blur",
                            transform(value) {
                                if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                                    return true;
                                }
                            },
                        },
                    ]}
                    >
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item
                        label="电话"
                        name="mobile"
                        rules={[{ required: true, message: '电话不能为空' },
                        {
                            type: "string",
                            message: "请输入正确的电话号码",
                            trigger: "blur",
                            transform(value) {
                                if (!/^1[345789]\d{9}$/.test(value)) {
                                    return true;
                                }
                            },
                        },
                    ]}
                    >
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <div><Button onClick={comeBack}>取消</Button></div>
                            <div><Button type="primary" htmlType="submit">确定</Button></div>
                        </div>
                    </Form.Item>
                </Form>

            </Modal>


            {/* 编辑角色弹出的Modal框 */}
            <Modal title="编辑用户" visible={visible} okText="确定" cancelText="取消" footer={false} onCancel={canceled}>
                <Form
                    form={form}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    validateTrigger="onBlur"
                    onFinish={onSure}
                >
                    <Form.Item
                        label="用户名"
                        name="user"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                        name="emails"
                        rules={[{ required: true, message: '邮箱不能为空' },
                        {
                            type: "string",
                            message: "请输入正确的邮箱",
                            trigger: "blur",
                            transform(value) {
                                if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                                    return true;
                                }
                            },
                        },
                    ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="电话"
                        name="phone"
                        rules={[{ required: true, message: '电话不能为空' },
                        {
                            type: "string",
                            message: "请输入正确的电话号码",
                            trigger: "blur",
                            transform(value) {
                                if (!/^1[345789]\d{9}$/.test(value)) {
                                    return true;
                                }
                            },
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <div><Button onClick={back}>取消</Button></div>
                            <div><Button type="primary" htmlType="submit">确定</Button></div>
                        </div>
                    </Form.Item>
                </Form>

            </Modal>


            {/* 表格 */}
            <Table columns={columns} rowKey={record => record.id} dataSource={data} />
        </div>
    )
}
export default Users