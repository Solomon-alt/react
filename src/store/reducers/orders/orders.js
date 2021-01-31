let initState = {
    orders: [],
}

//action 是一个对象 分别为type 一个是data userReducer自己取的名字
export default function orderReducer(state = initState, action) {
    switch (action.type) {
        case 'getOrder':
            return {
                ...state,
                orders: action.data
            }
        default:
            return {
                ...state
            }
    }
}