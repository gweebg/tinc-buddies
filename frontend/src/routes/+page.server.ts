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

export const load: PageServerLoad = async () => {
	const data = await fetchAIData();

	return {
		botData: data
	};
};
