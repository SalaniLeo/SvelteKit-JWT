/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const loggedIn = cookies.get('loggedIn');
    // setTheme(cookies.get('theme'), false)

    return {
		loggedIn: loggedIn,
        // theme: theme
	};
}