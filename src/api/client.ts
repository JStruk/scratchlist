import axios, { Axios } from "axios";

const client: Axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export default client

