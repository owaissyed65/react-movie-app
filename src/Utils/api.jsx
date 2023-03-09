import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3"
const token = import.meta.env.VITE_APP_TMBD_TOKEN;
const headers = {
    Authorization: "bearer " + token
}
const fetchDataFromApi = async (url, params) => {
    try {
        const res = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        const data = await res.data
        return data
    } catch (error) {
        console.log(error);
    }
}

export default fetchDataFromApi

