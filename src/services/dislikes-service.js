import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
	withCredentials: true
});


export const findAllTuitsDisLikedByUser = (uid) =>
	api.get(`${USERS_API}/${uid}/dislikes`)
		.then(response => response.data);


export const userDislikesTuit = (uid, tid) =>
	api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
		.then(response => response.data);
