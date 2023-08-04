export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { author: action.payload }
        case "LOGOUT":
            return { author: null }
        default:
            return state
    }
}
