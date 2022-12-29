import { useState } from 'react';

export type AppProps = {
	customerID: number;
};

export default function AddOrder({ customerID }: AppProps) {
	const [active, setActive] = useState(false);
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState(NaN);
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
				</div>
			) : null}
		</div>
	);
}
