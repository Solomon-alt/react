let initState = {
    roles: [],
    power: []
}

//action 是一个对象 分别为type 一个是data userReducer自己取的名字
export default function rightReducer(state = initState, action) {
    switch (action.type) {
        case 'getroles':
            return {
                ...state,
                roles: action.data
            }
        case 'getPower':
            return {
                ...state,
                power: action.data
            }
        case ' editRole':
            return {
                ...state,
            }
        case 'addRoles':
            return {
                ...state,
            }
        default:
            return {
                ...state
            }
    }
}