import {combineReducers} from 'redux';
import bsReducer from './bs_reducer';



export default combineReducers({
    bs: bsReducer,
})