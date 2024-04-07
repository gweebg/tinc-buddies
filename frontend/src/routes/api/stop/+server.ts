import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const id = data.id;

	let response;
	try {
		response = await fetch('http://backend-app:3000/configs/deactivate/' + id, {
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
		console.error(response);
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
			message: 'deactivated'
		}
	};
};
