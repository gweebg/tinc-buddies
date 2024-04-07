/* eslint-disable @typescript-eslint/no-unused-vars */
import { createConfigSchema, type ConfigFormSchema } from '$lib/schemas/create_config';
import { superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

import { API_URL } from '$env/static/private';
import { error, fail } from '@sveltejs/kit';

const fetchConfigs = async (): Promise<ConfigSchema[]> => {
	let response;
	try {
		response = await fetch(API_URL + '/configs/user/1');
		return await response.json();
	} catch (err) {
		console.log(err);
		return [];
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

const createConfig = async (
	formData: SuperValidated<Infer<ConfigFormSchema>>
): Promise<boolean> => {
	const data = Object.fromEntries(
		Object.entries(formData.data).filter(([_, value]) => value !== undefined)
	);

	data.user = 1;

	try {
		const response = await fetch(API_URL + '/configs', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
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
	const form = await superValidate(zod(createConfigSchema));

	const user = await fetchBalance();
	if (user === undefined) {
		error(404);
	}

	return {
		configs,
		form,
		balance: user.balance
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
