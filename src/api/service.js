import { API_BASE_URL } from "./config";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export const call = async(api, method, request) => {
    let headers = new Headers({
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*"
    });

    // const accessToken = localStorage.getItem(ACCESS_TOKEN);
    
    // if (accessToken && accessToken !== null) {
    //     headers.append("Authorization", "Bearer " + accessToken);
    // }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            } else return response.json();
        })
        .catch((error) => {
            console.log(error);
            console.log(error.status);
            
            if (error.status === 403) {
                // location.replace = '/login'; {navigate login.js}
            }
            return Promise.reject(error);
        });
}


export const login = (employee) => {
    return call('/auth/login', 'POST', employee)
        .then(res => {
            if (res.data.accessToken) {
                // 로컬 스토리지에 토큰 저장
                localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
                location.href = "/"
            }
        })
}