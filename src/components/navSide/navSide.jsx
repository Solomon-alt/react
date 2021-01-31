import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux' //useSelector用以拿到值
import { getMenus } from '../../store/actions/user/user'
import { Menu } from 'antd'
import * as Icons from '@ant-design/icons' //引入全部图标
import { useLocation, useHistory } from 'react-router-dom'

const { SubMenu } = Menu

const NavSide = () => {
  let dispatch = useDispatch() // 提交action
  let location = useLocation()
  let history = useHistory()
  // 拿到当前路由的路径
  let pathname = location.pathname
  // 拿到父级菜单的路径
  let subPath = pathname.split('/')[1]

  let menus = useSelector(state => state.user.menus)  //拿到值
  // 动态渲染图标  非常重要
  let renderIcon = (name) => {
    return React.createElement(Icons && Icons[name], {
      style: {
        fontSize: '16px'
      }
    })
  } //图标
  // 递归渲染侧边栏  非常重要
  let renderMenu = (data) => {
    return data.map(item => {
      if (item.children && item.children.length) {
        return (
          <SubMenu icon={renderIcon(item.icon)} title={item.authName} key={item.path}>
            {
              renderMenu(item.children)
            }
          </SubMenu>
        )
      }
      return (
        <Menu.Item icon={renderIcon(item.icon)} title={item.authName} item={item} key={item.key}>
          {
            item.authName
          }
        </Menu.Item>
      )
    })
  }
  //声明数组
  // let ary =[{name:'首页',path:'/'}]
  // sessionStorage.setItem('arr',JSON.stringify(ary))

  // 点击菜单
  let clickItem = (item) => {
    history.push(item.key) // 跳路由
    if (sessionStorage.getItem('arr') === null) {
      let arr = [{ name: '首页', path: '/' }]
      sessionStorage.setItem('arr', JSON.stringify(arr))
    } else {
      let arr = JSON.parse(sessionStorage.getItem('arr'))
      let obj = {}
      obj.name = item.item.props.item.authName
      obj.path = item.key
      let flag = arr.some(item => {
        return item.name === obj.name
      }) //数组去重
      if (!flag) {
        arr.push(obj)
        sessionStorage.setItem('arr', JSON.stringify(arr))
      }//数组去重
    }
  }
  useEffect(() => {
    dispatch(getMenus())
  }, [])
  return (
    <Menu
      mode="inline"
      theme='light'
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={[subPath]}
      onClick={clickItem}>
      {
        renderMenu(menus)
      }
    </Menu>
  )
}

export default NavSide