import './App.css';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import AddOrder from './components/AddOrder';

const GET_DATA = gql`
	{
		customers {
			id
			name
			industry
			orders {
				id
				description
				totalInCents
			}
		}
	}
`;

const MUTATE_DATA = gql`
	mutation MUTATE_DATA($name: String!, $industry: String!) {
		createCustomer(name: $name, industry: $industry) {
			customer {
				id
				name
			}
		}
	}
`;

export type Order = {
	id: number;
	description: string;
	totalInCents: number;
	// customer: Customer[];
};

export type Customer = {
	id: number;
	name: string;
	industry: string;
	orders: Order[];
};

function App() {
	const [name, setName] = useState<string>('');
	const [industry, setIndustry] = useState<string>('');
	const { loading, error, data } = useQuery(GET_DATA);
	const [
		createCustomer,
		{
			loading: createCustomerLoading,
			error: createCustomerError,
			data: createCustomerData,
		},
	] = useMutation(MUTATE_DATA, {
		refetchQueries: [
			{ query: GET_DATA }, // DocumentNode object parsed with gql
		],
	});

	// useEffect(() => {
	// 	console.log(loading, error, data);
	// 	console.log(createCustomerLoading, createCustomerError, createCustomerData);
	// });

	return (
		<>
			<div className='App'>
				<h1>Customers 🚀</h1>
				{error ? <p>Something went wrong</p> : null}
				{loading ? <p>loading</p> : null}
				{data
					? data.customers.map((customer: Customer) => {
							return (
								<div key={customer.id}>
									{' '}
									<br />
									<h3 key={customer.id}>
										{customer.name + '\t(' + customer.industry + ')'}
									</h3>
									{customer.orders.map((order: Order) => {
										return (
											<p key={order.id}>
												{'\t' +
													order.description +
													'\t' +
													(order.totalInCents / 100).toLocaleString('en-IN', {
														style: 'currency',
														currency: 'INR',
														minimumFractionDigits: 2,
													})}
											</p>
										);
									})}
									<AddOrder customerID={customer.id} />
								</div>
							);
					  })
					: null}
			</div>
		</>
	);
}

export default App;
