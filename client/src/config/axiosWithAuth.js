import axios from 'axios';

export const baseURL = 'http://localhost:5000/api';
// https://master-slack-standup.herokuapp.com/api
//

export function axiosWithAuth() {
	const token = localStorage.getItem('token');

	return axios.create({
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
		}
	});
}
