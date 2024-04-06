import { API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const fetchConfig = async (id: number): Promise<ConfigSchema | undefined> => {
	let response;
	try {
		response = await fetch(API_URL + '/configs/' + id);

		if (!response.ok) {
			console.error(response);
			return undefined;
		}

		return await response.json();
	} catch (err) {
		console.error(err);
		return undefined;
	}
};

const fetchTransactions = async (id: number): Promise<TransactionSchema[] | undefined> => {
	let response;
	try {
		response = await fetch(API_URL + '/transactions/config/' + id);

		if (!response.ok) {
			console.error(response);
			return undefined;
		}

		return await response.json();
	} catch (err) {
		console.error(err);
		return undefined;
	}
};

export const load: PageServerLoad = async ({ params }) => {
	const id: number = Number(params.id);

	const config = await fetchConfig(id);
	if (config === undefined) {
		throw error(404);
	}

	const tx = await fetchTransactions(id);
	if (tx === undefined) {
		throw error(404);
	}

	// [
	// 	{
	// 		type: 'buy',
	// 		inputAmount: 300,
	// 		outputAmount: 0.001,
	// 		date: 'April 6 2024, 14:34:51 GMT',
	// 		config: 1,
	// 		status: 'completed'
	// 	},
	// 	{
	// 		type: 'sell',
	// 		inputAmount: 0.1,
	// 		outputAmount: 10000,
	// 		date: 'April 6 2024, 19:34:51 GMT',
	// 		config: 1,
	// 		status: 'pending'
	// 	}
	// ]

	return {
		config: config,
		transactions: tx
	};
};
