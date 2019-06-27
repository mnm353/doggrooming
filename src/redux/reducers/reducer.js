import { combineReducers} from 'redux'

const user = (state= {}, action) => {
    switch(action.type){
        case 'set_user':
            return action.payload;
        default:
            return state;
    }
    return state;
}

export default combineReducers({user});