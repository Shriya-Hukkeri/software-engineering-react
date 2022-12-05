import axios from "axios";

const BASE_URL = "http://localhost:4000";

const AUTH_API = `${BASE_URL}/api/auth`;


const api = axios.create({
	withCredentials: true
});

export const signup = (user) =>
	api.post(`${AUTH_API}/signup`, user)
		.then(response => response.data);

export const login = (user) =>
	api.post(`${AUTH_API}/login`, user)
		.then(response => response.data);

export const profile = (user) =>
	api.post(`${AUTH_API}/profile`, user)
		.then(response => response.data);


export const logout = (user) =>
	api.post(`${AUTH_API}/logout`, user)
		.then(response => response.data);

