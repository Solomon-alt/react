import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import store from './store'; //发请求第二步
import { Provider } from 'react-redux' //发请求第三步


ReactDOM.render(
    <Provider store={store} >
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);
//发请求第四步将App用Provider包起来，后面写上store = { store }
//第五步到 store 文件夹下创建一个 reducers 文件夹和 actions 文件夹