export async function load({ cookies, params }) {
    // @ts-ignore
    let loggedIn = cookies.get("loggedIn", { path: '/' })

	return {
		user: {
			'loggedIn': loggedIn
	    }
	};
}