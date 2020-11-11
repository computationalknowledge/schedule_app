
export const fetchSchedules = () => {
    return dispatch => {
        firebase.firestore().collection('schedules').onSnapshot((rawItems) => {  
            const schedules = []
            rawItems.forEach((item) => {
                schedules.push({
                    ...item.data(),
                    id: item.id
                }
            )})
            dispatch(setSchedules(schedules))   
        })
    }
}

export const addSchedule = schedule => {
    return {
        type: "ADD_SCHEDULE",
        payload: schedule
    }
}

export const addDaycare = daycare => {
    return {
        type: "ADD_DAYCARE",
        payload: daycare
    }
}

export const setSchedules = schedules => {
    return {
        type: "SET_SCHEDULES",
        payload: schedules
    }
}