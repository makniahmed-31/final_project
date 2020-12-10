import {LOGGED_IN_USER , LOGOUT} from '../constants/actionTypes'


export const userReducer = (state = null,{type,payload}) => {
    switch (type) {

        case LOGGED_IN_USER:
            return payload;
        case LOGOUT:
            return payload;
    
        default:
            return state;
    }
}