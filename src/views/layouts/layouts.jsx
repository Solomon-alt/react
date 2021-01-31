import React, { useState } from 'react'
import { Layout } from 'antd';
import NavSide from '../../components/navSide/navSide';
import NavHeader from '../../components/navHeader/navHeader';

const { Sider, Content } = Layout;

const Layouts = (props) => {
  let [collapsed, setCollapsed] = useState(false)
  let toggle = (val) => {
    setCollapsed(val)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{
        paddingTop: 60, backgroundColor: '#fff', overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
        <NavSide collapsed={collapsed}></NavSide>
      </Sider>
      <Layout className="site-layout">
        <NavHeader collapsed={collapsed} toggle={toggle}></NavHeader>
        <Content
          className="site-layout-background"
          style={{
            minHeight: 280,
            margin: "134px 0 0 200px",
            border: '1px solid #F0F2F5',
             borderTop:'0',
            backgroundColor: '#fff'
          }}
        >
          <div style={{
            width: '97%',
            height: '100%',
            borderTop: '1px solid #F0F2F5',
            margin:'auto',
            paddingTop:"20px",
          }}>
            {
              props.children
            }
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
export default Layouts