import './App.css';
import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';

const GET_DATA = gql`
	{
		customers {
			id
			name
			industry
		}
	}
`;

export type Customer = {
	id: number;
	name: string;
	industry: string;
};

function App() {
	const { loading, error, data } = useQuery(GET_DATA);

	useEffect(() => {
		console.log(loading, error, data);
	});

	return (
		<div className='App'>
			<h2>My first Apollo app 🚀</h2>
			{error ? <p>Something went wrong</p> : null}
			{loading ? <p>loading</p> : null}
			{data
				? data.customers.map((customer: Customer) => {
						return (
							<p key={customer.id}>
								{customer.name}
								{customer.industry}
							</p>
						);
				  })
				: null}
		</div>
	);
}

export default App;
