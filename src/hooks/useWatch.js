import { useEffect } from 'react'


export function useWatch(data, callback) { //data 监听的数据 callback回调函数
    useEffect(() => {
            callback() //执行callback()
        }, [data]) //传入data
} //第十步