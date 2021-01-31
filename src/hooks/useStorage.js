export function useStorage() {
    //里面可以是 local session 
    //存，取，清除，清除所有 
    let types = {
        localStorage: localStorage,
        sessionStorage: sessionStorage
    }
    let setItem = (type = 'localStorage', data, key) => { //传入一个参数让他默认为localStorage  不传就去找默认值，第二个传入data可选参数 第三个参数传入key为存取的标识
        //保存
        if (data) {
            //判断data类型 
            if (typeof data === 'object' && data !== null) {
                types[type].setItem(key, JSON.stringify(data))
            } else {
                types[type].setItem(key, data)
            }
        }
    }

    // 取
    let getItem = (type, key) => { //字符串除了number和布尔类型可以通过JSON.parse转其他的都会报错
        let data = types[type].getItem(key)
            // if(JSON)
            // let start = data.charAt(0)
            // let end = data.charAt(data.length - 1)
            // console.log(start, end);
            // if (typeof data === 'object' && data !== null) {
            //     return JSON.parse(types[type].getItem(key))
            // } else {
            //     return types[type].getItem(key)
            // }
    }

    //清除单个
    let removeItem = (type, key) => {
        types[type].removeItem(key)
    }

    //全部清除
    let clear = (type) => {
        types[type].clear()
    }


    return {
        setItem,
        getItem,
        removeItem,
        clear
    }
}