import { API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './(protected)/user/bots/$types';

const fetchAIData = async (): Promise<AIDataSchema | undefined> => {
	let response;
	try {
		response = await fetch('http://tinker:3010/result');

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

const fetchBalance = async (): Promise<UserSchema | undefined> => {
	let response;
	try {
		response = await fetch(API_URL + '/accounts/1');
		return await response.json();
	} catch (err) {
		console.log(err);
		return undefined;
	}
};

export const load: PageServerLoad = async () => {
	const data = await fetchAIData();
	const user = await fetchBalance();
	if (user === undefined) {
		error(404);
	}

	return {
		botData: data,
		balance: user.balance
	};
};
