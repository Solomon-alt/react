import React from 'react'
import { Button } from 'antd';
import {useHistory} from 'react-router-dom'

const NotFound = () => {
    let history = useHistory()
    let back=()=>{
        history.go(-1)
    }
    return ( 
        <div
        style={{
            width:'100vw',
            height:'100vh',
             display:'flex',
            alignItems:'center',
        }}>
            <div
            style={{
                display:'flex',
                width:'100vw',
                height:'435px',
            }}>
                <div className="error"></div>
                <div style={{
                    width:'400px',
                    height:"100%",
                }}>
                    <h1 style={{
                        marginTop:180,
                        fontWeight:'700',
                    }}>404</h1>
                    <div style={{
                        marginBottom:30,}}>抱歉,你访问页面的页面不存在或正在开发中</div>
                    <Button type="primary" onClick={back}>返回首页</Button>
                </div>
            </div>
        </div>
    )
}
export default NotFound