
import {BUY, SELL} from '../../actions/component_switch_actions';
import {merge} from 'lodash';

export default (state = "buy", action) => {
    Object.freeze(state);
    switch (action.type) {
        case BUY:
            return action.action;
        case SELL:
            return action.action;
        default: 
            return state;
    }
}