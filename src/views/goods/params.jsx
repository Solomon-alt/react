import React, { useState, useEffect, useMemo } from 'react'//第七部引入useEffect
import { Input, Button } from 'antd' // 第一步引入useState 和input框
import { useWatch } from '../../hooks/useWatch'
import { useStorage } from '../../hooks/useStorage'
import { useComputed } from '../../hooks/useComputed'


//实现v-model第一步到第六步
//监听 第七步到第十一步
//hooks也叫钩子函数
//计算属性引入useMemo等同于计算属性

//封装Storage  先创建一个useStorage.js文件这个最好用文件夹包起来

const Params = () => {
    let [value, setValue] = useState(123) // 第二部赋值
    let onChange = (e) => {
        setValue(e.target.value)//第五步
    }


    //计算属性


    let [num, setNum] = useState(100)

    let { setItem, getItem, removeItem, clear } = useStorage()
    // useEffect(()=>{
    //     console.log(111);
    // },[value])//第八步 第二个参数传的是空数组就等同于mounted，第二个参数是数组可以传递依赖项改变value的值就会重新执行console.log(111),
    //第九步自定义一个hooks在src文件夹下创建一个hooks文件夹hooks文件都是以use开头
    // useWatch(value,()=>{ //value要监听的数据
    //     console.log(value);
    // }) // 第十一步此时就实现了监听的效果  //上面还要将useWatch引入 react不用深度监听
    let handle = () => {
        // setItem('localStorage', 'jsck', 'name')
        // setItem('localStorage', 15652, 'number') //存
        let number = getItem('localStorage', 'number')
        let name = getItem('localStorage', 'name')
        // console.log(number);
        // console.log(name);




        //计算属性
        num++
        setNum(num)

    }
    // let computedNum=useMemo(()=>{
    // return num+100
    //    },[num]) //数组是传入依赖的某一项，此处是num,这是不封装

    let computedNum = useComputed(() =>{
        

        //写逻辑

        return  num + 100
    }, [num])
    return (
        <div>
            <div> <Input value={value} /></div>{/*第三步引用此时输入框不鞥输入，这么绑定就是受控组件，不能进行输入*/}
            <div><Input defaultValue={value} onChange={(e) => onChange(e)} /></div>{/*第四步绑定defaultValue此时输入框就可以输入值了*/}
            <div> {value}</div>
            {/* 第六步就实现了v-model */}

            <div>
                <Button type="primary" onClick={handle}>点击</Button></div>
            {/* 此时就已经封装好了一存的localStorage */}
            {/* 封装localStorage */}


            <div>{computedNum}</div>


            {/* 计算属性 */}
        </div>
    )
}
export default Params