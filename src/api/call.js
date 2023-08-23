import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export const call = async(api, method, request) => {
    let navigate = useNavigate();
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
                navigate('/login', {replace: true})
            }
            return Promise.reject(error);
        });
}
