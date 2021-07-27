export default function requestToBackend(method, endpoint, bodyContent = {}, token) {
    const {
        REACT_APP_HOST,
        REACT_APP_PORT,
    } = process.env;
    const url = `http://${REACT_APP_HOST}:${REACT_APP_PORT}/${endpoint}`
    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (bodyContent) {
        requestOptions.body = JSON.stringify(bodyContent);
    }
    if (token) {
        requestOptions.headers.Authorization = `Bearer ${token}`;
    }
    return fetch(url, requestOptions);
}
