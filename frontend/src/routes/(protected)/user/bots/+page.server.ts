import { createConfigSchema, type ConfigFormSchema } from '$lib/schemas/create_config';
import { superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

import { API_URL } from '$env/static/private';
import { fail } from '@sveltejs/kit';

const fetchConfigs = async (): Promise<ConfigSchema[]> => {
	let response;
	try {
		response = await fetch(API_URL + '/configs');
		return await response.json();
	} catch (err) {
		console.log(err);
		return [];
	}
};

const createConfig = async (
	formData: SuperValidated<Infer<ConfigFormSchema>>
): Promise<boolean> => {
	try {
		const response = await fetch(API_URL + '/configs', {
			method: 'POST',
			body: JSON.stringify(formData.data)
		});

		if (!response.ok) {
			console.error('Failed to submit form data:', response.status, response.statusText);
			return false;
		}
	} catch (err) {
		console.error(err);
		return false;
	}
	return true;
};

export const load: PageServerLoad = async () => {
	const configs = await fetchConfigs();

	console.log(configs);

	const form = await superValidate(zod(createConfigSchema));

	return {
		configs: configs,
		form: form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createConfigSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const created = await createConfig(form);
		if (!created) {
			return fail(400, {
				form
			});
		}

		return {
			form
		};
	}
};
