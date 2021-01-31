let initState = {
    goods: [],
    list: [],
}


export default function goodsReducer(state = initState, action) {
    switch (action.type) {
        case 'getGoods':
            return {
                ...state,
                goods: action.data
            }
        case 'goodsList':
            return {
                ...state,
                list: action.data
            }
        case 'delGoods':
            return {
                ...state,
            }
        default:
            return {
                ...state
            }
    }
}