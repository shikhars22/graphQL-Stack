import './App.css';
import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';

const GET_DATA = gql`
	query GetLaunches {
		launchesPast(limit: 10) {
			mission_name
			launch_date_local
		}
	}
`;

export type Launch = {
	mission_name: string;
	launch_date_local: string;
	launch_site: {
		site_name_long: string;
	};
};

function App() {
	const { loading, error, data } = useQuery(GET_DATA);

	useEffect(() => {
		console.log(loading, error, data);
	});

	return (
		<div className='App'>
			<h2>My first Apollo app 🚀</h2>
			{data
				? data.launchesPast.map((launch: Launch) => {
						return (
							<p>
								{launch.mission_name}
								{launch.launch_date_local}
							</p>
						);
				  })
				: null}
		</div>
	);
}

export default App;
