import * as UserApiUtil from "../util/users_util"

export const ENCOUNTER_USER = 'ENCOUNTER_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const RECEIVE_ERRORS = "RESET_ERRORS";

const receiveUserInfo = (info) => {
    return {
        type: ENCOUNTER_USER,
        info
    }
}

const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
})

export const fetchUser = (id) => {
    return dispatch => {
        return UserApiUtil.fetchUser(id)
            .then((info) => {
                return dispatch(receiveUserInfo(info))}, error => {
                return dispatch(receiveErrors(error))
            })
    }
}

export const updateUserInfo = (id, total_price) => {
    return dispatch => {
        return UserApiUtil.updateBalance(id, total_price)
            .then((info) => {
                return dispatch(receiveUserInfo(info))}, error => {
                return dispatch(receiveErrors(error))
            })
    }
}