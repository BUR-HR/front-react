import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export const call = async (api, method, request) => {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    try {
        return await fetch(options.url, options).then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }

            return response.json();
        });
    } catch (error) {
        if (error?.status === 401) {
            localStorage.removeItem(ACCESS_TOKEN);
            <Navigate to="login" />;
        } else if (error?.status === 403) {
            <Navigate to="login" replace="true" />;
        } else if (error?.status === 404) {
            return error.json();
        }
    }
};

export const login = async (employee) => {
    return call("/auth/login", "POST", employee).then((res) => {
        if (res?.data.accessToken) {
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
            location.href = "/";
        }
    });
};
