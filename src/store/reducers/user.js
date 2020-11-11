const initialState = {
    user: null
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'ON_LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

export default user