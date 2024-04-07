import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	let response;
	try {
		response = await fetch('http://backend-app:3000/accounts/deposit/1/100', {
			method: 'PUT'
		});

		if (!response.ok) {
			return {
				status: response.status,
				body: {
					message: 'response status code != 200'
				}
			};
		}
	} catch (err) {
		return {
			status: 500,
			body: {
				message: err
			}
		};
	}

	return {
		status: 200,
		body: {
			message: 'deleted'
		}
	};
};
