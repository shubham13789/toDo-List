import axios from "axios";
import { useRouter } from "vue-router";
import Cookies from 'js-cookie';

const router = useRouter();
let retry = 0;

export function refreshAuthHeader() {
    console.log('refreshed');
    const refreshToken = Cookies.get('refreshToken');
    axios.defaults.headers.common['Authorization'] = refreshToken;
    axios
        .post("https://nextjs-dev.deploy.nl/auth/refresh")
        .then((response) => {
            setAuthHeader(response.data.accessToken)
        })
        .catch((error) => {
            console.log(error);
        });
}

//handing api responses
axios.interceptors.response.use(
    response => {
        // Return a successful response
        return response
    },
    error => {
        // Handle any error responses
        // Check if it is a 401 unauthorized error
        if (retry == 2) {
            router.push({ name: "Login" });
        }
        if (error.response.status === 401) {
            refreshAuthHeader();
        } else {
            alert('An API error occurred: ', error)
        }
        // Return an error object with the error message
        retry++;
        return Promise.reject(error)
    }
)


//setting auth token header 
export function setAuthHeader(token) {

    if (token) {
        axios.defaults.headers.common = {
            Authorization: "Bearer " + token,
        }
    }
    else {
        localStorage.removeItem("token");

    }
}




export default {
    setAuthHeader,
    refreshAuthHeader
};