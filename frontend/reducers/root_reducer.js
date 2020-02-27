// import entities from './entities/entities_reducer';
import errors from './errors/session_errors_reducer';
import session from './session/session_reducer';
import entities from './entities/entities_reducer'
import {combineReducers} from 'redux';
import backend from './backend/errors_reducer'

const rootReducer = combineReducers({
    errors,
    session,
    entities,
    backend
});

export default rootReducer;