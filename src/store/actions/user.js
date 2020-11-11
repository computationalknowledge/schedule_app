export const logoutAction = () => {
    return {
        type: "ON_LOGOUT"
    }
}

export const loginAction = (user) => {
    return {
        type: "ON_LOGIN",
        payload: user
    }
}

export const logOutUser = () => {
    return dispatch => {
        dispatch(logoutAction())
    }
}

export const logInUser = (user) => {
    return dispatch => {
        dispatch(loginAction({ _id: 0, name: "Marta" }))
    }
}