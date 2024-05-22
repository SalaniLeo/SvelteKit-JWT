import { LOGIN_URL } from '$env/static/private';
import { isUserLogged } from '$lib/store.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
            return fail(403, {
                error: "Please fill up each field",
                state: "var(--font-primary-color)"
            });
        }
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok) {
            const json = await response.json();
            isUserLogged.set('true')
            cookies.set('accessToken', json.user.token, { path: '/', secure: false, maxAge: 24 * 60 * 60 * 30 } );
            throw redirect(303, '/');
        }

        if (response.status === 401) {
            return fail(401, {
                error: "Incorrect username or password",
                state: "var(--font-error-color)"
            });
        }

        if (response.status === 400) {
            return fail(404, {
                error: "User not found, sign in instead",
                state: "var(--font-warning-color)"
            });
        }
    }
};
