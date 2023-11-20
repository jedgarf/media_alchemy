const localIPAddress = '192.168.1.127';
const localPort = '3000';
const localBaseUrl = `http://${localIPAddress}:${localPort}`;
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === localIPAddress;

let base_url = process.env.REACT_APP_NODE_ENV === 'DEVELOPMENT' ? localBaseUrl : process.env.REACT_APP_API_BASE_URL;

if (isLocalhost) {
    base_url = localBaseUrl;
}

var apiConfig = {
    "api_key": process.env.REACT_APP_API_KEY,
    "override_cors": process.env.REACT_APP_OVERRIDE_CORS + "/",
    "base_url": base_url + "/v2",
}

export default apiConfig;