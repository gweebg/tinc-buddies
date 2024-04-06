import { API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

const fetchConfig = async (id: number): Promise<ConfigSchema | undefined> => {
	let response;
	try {
		response = await fetch(API_URL + '/configs/' + id);
		return await response.json();
	} catch (err) {
		console.error(err);
		return undefined;
	}
};

export const load: PageServerLoad = async ({ params }) => {
	const id: number = Number(params.id);
	return {
		config: await fetchConfig(id)
	};
};
