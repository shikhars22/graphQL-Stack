import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

export type AppProps = {
	customerID: number;
};

const MUTATE_DATA = gql`
	mutation MUTATE_DATA(
		$description: String!
		$totalInCents: Int!
		$customer: ID!
	) {
		createOrder(
			customer: $customer
			description: $description
			totalInCents: $totalInCents
		) {
			order {
				id
				customer {
					id
				}
				description
				totalInCents
			}
		}
	}
`;

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

export default function AddOrder({ customerID }: AppProps) {
	const [active, setActive] = useState(false);
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState(NaN);

	const [createOrder, { loading, error, data }] = useMutation(MUTATE_DATA, {
		refetchQueries: [
			{ query: GET_DATA }, // DocumentNode object parsed with gql
		],
	});
	useEffect(() => {
		if (data) {
			console.log(data);
			setDescription('');
			setAmount(NaN);
		}
		// console.log(loading, error, data);
		// console.log(createCustomerLoading, createCustomerError, createCustomerData);
	});

	return (
		<div>
			{active ? null : (
				<button
					onClick={() => {
						setActive(true);
					}}>
					{' '}
					+ New Order{' '}
				</button>
			)}
			{active ? (
				<div>
					<form
						id='createCustomer'
						onSubmit={(e) => {
							e.preventDefault();
							createOrder({
								variables: {
									customer: customerID,
									description: description,
									totalInCents: amount * 100,
								},
							});
							console.log(customerID, description, amount);
						}}>
						<div className='flex justify-center'>
							<div>
								<label htmlFor='description'>Description</label>
								<input
									id='description'
									type={'text'}
									value={description}
									onChange={(e) => {
										setDescription(e.target.value);
									}}
								/>
							</div>
							<div>
								<label htmlFor='amount'>Amount</label>
								<input
									id='amount'
									type={'number'}
									value={amount.toString()}
									onChange={(e) => {
										setAmount(parseFloat(e.target.value));
									}}
								/>
							</div>
							<button>Add order</button>
							{/* <button
								disabled={createCustomerLoading ? true : false}
								form='createCustomer'>
								Create customer
							</button>
							{createCustomerError ? <p>Error creating customer</p> : null} */}
						</div>
					</form>
					{error ? <p>something went wrong</p> : null}
				</div>
			) : null}
		</div>
	);
}
