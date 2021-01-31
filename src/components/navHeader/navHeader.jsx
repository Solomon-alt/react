import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
const { Header } = Layout;

const NavHeader = (props) => {
    let toggle = () => {
        props.toggle(!props.collapsed)  //改变父组件的值
    }
    let [hello, setHello] = useState('早上好')
    let [time, setTime] = useState(dayjs().format(`YYYY-MM-DD  HH:mm:ss`))
    let [username, setUsername] = useState()
    // 获取当前时间
    useEffect(() => {
        if (dayjs().hour() > 6 && dayjs().hour() <= 12) {
            setHello('早上好')
        } else if (dayjs().hour() > 12 && dayjs().hour() <= 14) {
            setHello('中午好')
        } else if (dayjs().hour() > 14 && dayjs().hour() <= 18) {
            setHello('下午好')
        } else if (dayjs().hour() > 18 && dayjs().hour() <= 23) {
            setHello('晚上好')
        } else {
            setHello('食屎啦你还不睡觉')
        }
        let timer = setInterval(() => {
            setTime(dayjs().format(`YYYY-MM-DD ${hello} HH:mm:ss`))
        }, 1000)
        //  取出存在localStorage中的用户名
        setUsername(JSON.parse(localStorage.getItem('username')).username)
        return () => {
            clearInterval(timer)
        }
    }, [hello])

    let [arrs, setarrs] = useState([])
    useEffect(() => {
        if (sessionStorage.getItem('arr') === null) {
            let arr = [{ name: '首页', path: '/' }]
            setarrs(arr)
            sessionStorage.setItem('arr', JSON.stringify(arr))
        } else {
            setarrs(JSON.parse(sessionStorage.getItem('arr')))
        }

    }, []) //重要



    //点击上面标签===========================================================================
    let [flag, setFlag] = useState('0')
    let handle = (item, index) => {
        console.log(item);
        setFlag(index)
    }

    return (
        <div>
            <Header className="site-layout-background"
                style={{
                    padding: '0 20px',
                    background: '#fff',
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    flexWrap: "wrap",
                }}>
                <div>
                    {
                        props.collapsed ? <MenuUnfoldOutlined onClick={toggle} /> : <MenuFoldOutlined onClick={toggle} />  //第二种办法
                    }
                </div>
                <div style={{
                    marginLeft: '20px',
                    color: '#685E85'
                }}>欢迎来到小爱后台系统</div>

                {/* 时间 */}
                <div style={{
                    marginLeft: '600px',
                    color: '#685E85'
                }}>{time}</div>
                {/* 天气 */}
                <div style={{
                    margin: '0 20px',
                }}>
                    <div className="weather ml20" style={{ border: 'none' }}>
                        <iframe
                            width="400"
                            height="26"
                            frameBorder="0"
                            scrolling="no"
                            hspace="0"
                            src="https://i.tianqi.com/?c=code&a=getcode&id=40&icon=1"
                        ></iframe>
                    </div>
                </div>
                {/* 欢迎 */}
                <div>亲爱的<span style={{
                    color: '#685E85'
                }}>{username}</span></div>
                {/* 退出 */}
                <div style={{
                    margin: '0 0 0 20px',
                    color: '#409EFF',
                    cursor: 'pointer',
                }}>退出</div>
            </Header>
            <div style={{
                position: 'absolute',
                top: 64,
                left: 200,
                height: 70,
                lineHeight: "70px",
                width: "calc(100% - 200px)",
                zIndex: 5,
                border: '1px solid #F0F2F5',
                borderBottom: 'none',
                display: 'flex',
            }}>
                {
                    arrs.map((item, index) => {
                        return (
                            <div key={index} onClick={() => handle(item)}>
                                <span style={{
                                    border: '1px solid #ddd',
                                    marginLeft: '30px',
                                    padding: ' 0 2px',
                                }}>
                                  {/* flag===index ?  <span >11</span>{item.name} <span>22</span> 
                                  :<span style={{ display: 'none' }}>11</span>{item.name} < span style={{ display: 'none' }}>22</span> */}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default NavHeader