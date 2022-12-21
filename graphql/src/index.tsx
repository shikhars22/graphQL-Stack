import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from '@apollo/client';

let client = new ApolloClient({
	uri: 'https://api.spacex.land/graphql/',
	cache: new InMemoryCache(),
});

client
	.query({
		query: gql`
			{
				launchesPast(limit: 10) {
					mission_name
					launch_date_local
					launch_site {
						site_name_long
					}
				}
			}
		`,
	})
	.then((result) => console.log(result));

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>
);
