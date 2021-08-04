export default function fetchBackend(method, endpoint, bodyContent, isFile = false) {
    const token = JSON.parse(localStorage.getItem('token'));
    const {
        REACT_APP_HOST,
        REACT_APP_PORT,
    } = process.env;
    const url = `http://${REACT_APP_HOST}:${REACT_APP_PORT}/${endpoint}`
    let requestOptions = { method };
    requestOptions.headers = {
        'Content-Type': 'application/json'
    };
    if (isFile) {
        requestOptions.body = bodyContent;
        delete requestOptions.headers['Content-Type'];
    } else {
        if (bodyContent) {
            requestOptions.body = JSON.stringify(bodyContent);
        }
    }
    if (token) {
        requestOptions.headers.Authorization = `Bearer ${token}`;
    }
    return fetch(url, requestOptions);
}
