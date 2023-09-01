import {
    SET_ATTENDANCE_HISTORY,
    SET_ATTENDANCE_TYPE,
    SET_ELAPSED_TIME,
    SET_START_TIME
} from "./actionTypes";

export const initialState = {
    startTime: null,
    elapsedTime: 0,
    attendanceHistory: [],
    attendanceType: ''
};

export function reducer(state, action) {
    switch (action.type) {
        case SET_START_TIME:
            return { ...state, startTime: action.payload };
        case SET_ELAPSED_TIME:
            return { ...state, elapsedTime: action.payload };
        case SET_ATTENDANCE_HISTORY:
            return { ...state, attendanceHistory: action.payload };
        case SET_ATTENDANCE_TYPE:
            return { ...state, attendanceType: action.payload}
        default:
            return state;
    }
}

export {
    SET_ATTENDANCE_HISTORY, SET_ATTENDANCE_TYPE, SET_ELAPSED_TIME, SET_START_TIME
};

