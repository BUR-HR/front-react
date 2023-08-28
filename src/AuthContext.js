import {
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";
import base64 from "base-64";
import {
    SET_ATTENDANCE_TYPE,
    SET_START_TIME,
    initialState,
    reducer,
} from "./pages/attendance/reducers/AttendanceReducer";
import { call } from "./apis/service";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const [attendanceState, attendanceDispatch] = useReducer(
        reducer,
        initialState
    );
    let auth = null;

    useEffect(() => {
        if (token) {
            let payload = token.substring(
                token.indexOf(".") + 1,
                token.lastIndexOf(".")
            );
            auth = JSON.parse(base64.decode(payload)).auth;

            call("/api/v1/attendance/status", "POST", null).then((data) => {
                if (data.status === 404) {
                    attendanceDispatch({
                        type: SET_ATTENDANCE_TYPE,
                        payload: "출근",
                    });
                } else {
                    attendanceDispatch({
                        type: SET_ATTENDANCE_TYPE,
                        payload: data.attendanceType,
                    });
                    attendanceDispatch({
                        type: SET_START_TIME,
                        payload: data.startDateTime
                    })
                }
            });
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                auth,
                attendanceState,
                attendanceDispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
