let initState = {
    data: [],
}

//action 是一个对象 分别为type 一个是data userReducer自己取的名字
export default function dataReducer(state = initState, action) {
    switch (action.type) {
        case 'getData':
            return {
                ...state,
                data: action.data
            }
        default:
            return {
                ...state
            }
    }
}