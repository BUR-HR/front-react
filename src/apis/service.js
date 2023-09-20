import Swal from "sweetalert2";
import { API_BASE_URL } from "./config";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export const call = async (api, method, request) => {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
        credentials: "include",
    };

    if (request && method?.toLowerCase() !== "get") {
        options.body = JSON.stringify(request);
    } else {
        options.url = options.url + "?" + new URLSearchParams(request);
    }

    try {
        const response = await fetch(options.url, options);

        if (response.status === 401) {
            const reissue = await fetch(API_BASE_URL + "/auth/reissue", {
                method: "post",
                credentials: "include",
            });

            if (reissue.ok) {
                const data = await reissue.json();
                localStorage.setItem(ACCESS_TOKEN, data.data.accessToken);

                return call(api, method, request);
            }

            const error = await reissue.text();
            throw error;
        }

        if (response.status === 204) {
            return response;
        }

        if (!response.ok) {
            const error = await response.text();
            throw error;
        }

        return response.json();
    } catch (err) {
        if (err.message?.includes("Failed to fetch")) {
            Swal.fire({
                icon: "error",
                text: "서버와의 연결이 끊어졌습니다.",
            });
        }

        if (err.includes("만료")) {
            localStorage.removeItem("ACCESS_TOKEN");
            location.replace("/login");
        }

        return;
    }
};

export const login = async (employee) => {
    const result = await call("/auth/login", "POST", employee).then((res) => {
        if (res?.data.accessToken) {
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
            return res;
        }
    });

    return result;
};
