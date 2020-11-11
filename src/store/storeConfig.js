import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import user from './reducers/user'
import schedules from './reducers/schedules'

const reducers = combineReducers({
    user: user,
    schedules: schedules
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig