import React from 'react';
import ReactDOM from 'react-dom';
// import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/',
//   headers: {
//     authorization: localStorage.getItem('token')
//   }
// // });

// const httpLink = createHttpLink({
// 	uri: 'http://localhost:4000/'
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

// const authLink = setContext((request, previousContext) => ({
// 	headers: {
// 		authorization: localStorage.getItem('token')
// 	}
// }));

// const client = new ApolloClient({
// 	link: authLink.concat(httpLink),
// 	cache: new InMemoryCache()
// });

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
