import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	console.log(data);

	let response;
	try {
		response = await fetch('http://backend-app:3000/configs/' + data.id, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
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
