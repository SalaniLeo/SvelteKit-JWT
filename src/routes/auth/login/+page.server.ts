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

        const json = await response.json();
        if (json['status'] === 200) {
            cookies.set('accessToken', json.user.token, { path: '/', secure: false, maxAge: 24 * 60 * 60 * 30 } );
            throw redirect(303, '/');
        } else {
            return fail(json['status'], {
                error: json['response'],
                state: "var(--font-error-color)"
            });
        }
    }
};
