import './App.css';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useEffect, useState } from 'react';

const GET_DATA = gql`
	{
		customers {
			id
			name
			industry
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

export type Customer = {
	id: number;
	name: string;
	industry: string;
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
			<form
				id='createCustomer'
				onSubmit={(e) => {
					e.preventDefault();
					// console.log('submitting ...', name, industry);
					createCustomer({ variables: { name: name, industry: industry } });
					if (!error) {
						setIndustry('');
						setName('');
					}
				}}>
				<div className='flex justify-center'>
					<div>
						<label htmlFor='name'>Name</label>
						<input
							id='name'
							type={'text'}
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</div>
					<div>
						<label htmlFor='industry'>Industry</label>
						<input
							id='industry'
							type={'text'}
							value={industry}
							onChange={(e) => {
								setIndustry(e.target.value);
							}}
						/>
					</div>
					<button
						disabled={createCustomerLoading ? true : false}
						form='createCustomer'>
						Create customer
					</button>
					{createCustomerError ? <p>Error creating customer</p> : null}
				</div>
			</form>
		</>
	);
}

export default App;
