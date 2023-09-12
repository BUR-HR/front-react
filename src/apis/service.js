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

    if (request && method?.toLowerCase() !== 'get') {
        options.body = JSON.stringify(request);
    }

    if (method?.toLowerCase() === 'get') {
        options.url = options.url + "?" + new URLSearchParams(request);
    }

    const result = await fetch(options.url, options)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }

            if (response.status === 204) {
                return Promise.resolve(response);
            }
            return response.json();
        })
        .catch((err) => {
            if (err.message?.includes('Failed to fetch')) {
                return Promise.reject();
            }
            
            err.text().then((text) => {
                if (text.includes("Token")) {
                    localStorage.removeItem("ACCESS_TOKEN");
                    location.replace("/login");
                }
            });
        });
    
    return result;
};

export const login = async (employee) => {
    return call("/auth/login", "POST", employee).then((res) => {
        if (res?.data.accessToken) {
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
            return res;
        }
    });
};
