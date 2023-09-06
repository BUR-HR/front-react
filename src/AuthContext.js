import base64 from "base-64";
import { createContext, useContext, useEffect, useState } from "react";
import { call } from "./apis/service";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        token: localStorage.getItem("ACCESS_TOKEN"),
        auth: "",
        attendanceState: "",
        startDateTime: "",
    });

    if (user.token) {
        let payload = user.token.substring(
            user.token.indexOf(".") + 1,
            user.token.lastIndexOf(".")
        );

        user.auth = JSON.parse(base64.decode(payload)).auth;
    }

    useEffect(() => {
        if (!user.token) {
            return;
        }

        if (!user.attendanceState) {
            call("/api/v1/attendance/status", "POST", null)
                .then((data) => {
                    if (data.status === 204) {
                        setUser({
                            ...user,
                            attendanceState: "출근",
                        });
                    } else {
                        setUser({
                            ...user,
                            attendanceState: data.attendanceType,
                            startDateTime: data.startDateTime,
                        });
                    }
                })
                .catch(() => {});
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
