const initialState = {
    daycares: [
        {
            id: 4,
            name: 'Canada Daycare'
        }, {
            id: 3,
            name: 'Downtown School'
        }, {
            id: 2,
            name: 'Maples Daycare'
        }, {
            id: 1,
            name: 'Scarborough Daycare'
        }, {
            id: 0,
            name: 'Toronto School'
        }],
    daycareLastId: 4,
    scheduleLastId: 4,
    schedules: [{
        id: 0,
        creationDate: '08/10/2020',
        daycareName: 'Toronto School',
        daycareId: 0,
        startDate: '08/10/2020',
        endDate: '11/30/2020',
        startTime: '8:00 AM',
        endTime: '5:00 PM',
        status: 2
    },
    {
        id: 1,
        creationDate: '08/24/2020',
        daycareName: 'Scarborough Daycare',
        daycareId: 1,
        startDate: '08/25/2020',
        endDate: '11/02/2020',
        startTime: '9:30 AM',
        endTime: '4:30 PM',
        status: 1
    },
    {
        id: 2,
        creationDate: '06/12/2020',
        daycareName: 'Maples Daycare',
        daycareId: 2,
        startDate: '06/11/2020',
        endDate: '11/15/2020',
        startTime: '8:30 AM',
        endTime: '5:30 PM',
        status: 4
    },
    {
        id: 3,
        creationDate: '07/16/2020',
        daycareName: 'Downtown School',
        daycareId: 3,
        startDate: '06/17/2020',
        endDate: '09/04/2020',
        startTime: '8:00 AM',
        endTime: '5:00 PM',
        status: 2
    },
    {
        id: 4,
        creationDate: '09/16/2020',
        daycareName: 'Canada Daycare',
        daycareId: 4,
        startDate: '09/17/2020',
        endDate: '12/25/2020',
        startTime: '8:30 AM',
        endTime: '5:30 PM',
        status: 1
    }]
}

const schedules = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SCHEDULES':
            return {
                ...state,
                schedules: action.payload
            }
        case 'ADD_SCHEDULE':
            state.schedules.push({ ...action.payload,
                id: state.scheduleLastId + 1})
                
                state.scheduleLastId += 1
            return state
        case 'ADD_DAYCARE':
            state.daycares.push({ ...action.payload,
                id: state.daycareLastId + 1})
                state.daycareLastId += 1
            return state
        default:
            return state
    }
}

export default schedules