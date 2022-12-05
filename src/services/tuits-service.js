import axios from "axios";
//const BASE_URL = "http://my-node-express-project-env.eba-hxq4pgvm.us-east-1.elasticbeanstalk.com"
//const TUITS_API = "https://fse-node-deployment.herokuapp.com/tuits"
// const USERS_API = "http://localhost:4000/users"
// const TUITS_API = "http://localhost:4000/tuits"
const USERS_API = "https://fse-node-deployment.herokuapp.com/users"
const TUITS_API = "https://fse-node-deployment.herokuapp.com/tuits"

const api = axios.create({
	withCredentials: true
});

export const findAllTuits = () =>
	api.get(TUITS_API)
		.then(response => response.data);

export const findTuitById = (tid) =>
	api.get(`${TUITS_API}/${tid}`)
		.then(response => response.data);

// retrieve tuits posted by user
export const findTuitByUser = (uid) =>
	api.get(`${USERS_API}/${uid}/tuits`)
		.then(response => response.data);

// post tuit by user
export const createTuit = (uid, tuit) =>
	api.post(`${USERS_API}/${uid}/tuits`, tuit)
		.then(response => response.data);

export const updateTuit = (tid, tuit) =>
	api.post(`${TUITS_API}/${tid}`, tuit)
		.then(response => response.data);

export const deleteTuit = (tid) =>
	api.delete(`${TUITS_API}/${tid}`)
		.then(response => response.data);

export const deleteTuitByContent = (tuit) =>
	api.delete(`${TUITS_API}/content/${tuit}/delete`)
		.then(response => response.data);