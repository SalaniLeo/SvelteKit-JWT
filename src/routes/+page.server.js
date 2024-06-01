import { VALIDATE_URL } from '$env/static/private';

export async function load({ cookies, params }) {
	const accessToken = cookies.get('accessToken');

	if (accessToken != null) {
		const response = await fetch(VALIDATE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				accessToken
			})
		});

		if (response.status === 200) {
			cookies.set("loggedIn", 'true', { secure: false, path: '/' })
			return {
				post: {
					title: `Response is ${response.status}`,
					content: `You are authenticated!`
				},
				user: {
					loggedIn: "true"
				}
			};
		}
	}

	// @ts-ignore
	let loggedIn = cookies.get("loggedIn",{ path: '/' })
	if (loggedIn == null) {
		cookies.set('loggedIn', 'false', { secure: false, path: '/' })
	}
}