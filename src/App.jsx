import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { commomRoutes, authRoutes } from './router'
import Layouts from './views/layouts/layouts'
//BrowserRouter history模式
//Switch 精准匹配


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* 没权限 */}
        {
          commomRoutes.map(item => {
            return (
              <Route key={item.path} path={item.path}
                // component={item.component} 对路由做操作不需要
                exact={item.exact}
                render={(props) => {
                  document.title = item.meta.title
                  return (
                    <item.component {...props} />
                  )
                }}
              />
            )
          })
        }

        {/* 有权限 */}
        {
          authRoutes.map(item => {
            return (
              <Route key={item.path} path={item.path} exact={item.exact}
                render={(props) => {
                  if (!localStorage.getItem('token')) {
                    return (
                      <Redirect to="/login" />
                    )
                  }//路由守卫
                  document.title = item.meta.title
                  return (
                    <Layouts>
                      <item.component {...props} />
                    </Layouts>
                  )//标题
                }} />
            )
          })
        }
        <Redirect to='/404' />
      </Switch>
    </BrowserRouter>
  )
}
export default App