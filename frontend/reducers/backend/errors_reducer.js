import {combineReducers} from 'redux';
import error from './backend_errors_reducer'

const errors = combineReducers({
    error: error
});

export default errors;