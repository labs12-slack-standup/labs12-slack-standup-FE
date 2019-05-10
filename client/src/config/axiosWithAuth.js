import axios from 'axios';

export const baseURL = 'https://master-slack-standup.herokuapp.com/api';
// export const baseURL = 'http://localhost:5000/api';
export const deployedFEURL = 'https://stand-em-ups.netlify.com'
export const localFEURL = 'http://localhost:3000'

export function axiosWithAuth() {
	const token = localStorage.getItem('token');

	return axios.create({
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
		}
	});
}
