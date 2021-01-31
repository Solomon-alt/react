import React from 'react'
import { Button, Form, Input } from 'antd'
import { login } from '../../store/actions/user/user' //引入login
import { useDispatch } from 'react-redux' //提交


const Login = () => {
    let dispatch = useDispatch()
    let onFinish = (values) => {//自带values
        dispatch(login(values))
        console.log(values)
    }
    return (
        <div className="login"
            style={{
                width: '100vw',
                height: '100vh',
            }}
        >
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: '650px',
                    padding: '50px 0',
                    boxShadow: '0 0 10px rgba(0,0,0,.3)'
                }}
            >
                <h1 style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderBottom: '1px solid #EBEEF5'
                }}>欢迎来到小爱后台管理系统</h1>
                <Form
                    name="basic"
                    onFinish={onFinish} //onFinish表单验证成功后返回的函数
                    style={{
                        padding: "0 30px",
                    }}
                >
                    <Form.Item
                        label="请输入用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        label="请输入密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                        style={{
                            paddingLeft: 14
                        }}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item style={{
                        textAlign: 'center',
                        fontSize: "15px",
                    }}>
                        特别提醒: 如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{
                            display: 'block',
                            margin: 'auto'
                        }}>
                            登录
          </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default Login