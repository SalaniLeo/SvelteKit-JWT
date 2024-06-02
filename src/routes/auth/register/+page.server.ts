import { REGISTER_URL } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import { publicDecrypt } from 'crypto';
import Cookies from 'js-cookie';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email')
        const password = data.get('password')
        const firstname = data.get('firstname')
        const lastname = data.get('lastname')

        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname,
                lastname,
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
