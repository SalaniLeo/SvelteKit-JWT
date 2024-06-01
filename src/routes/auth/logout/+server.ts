// src/routes/auth/logout.js
import { serialize } from 'cookie';

export async function GET({ request }) {
    const loggedInCookie = serialize('loggedIn', 'false', {
        secure: false,
        path: '/'
    });

    const accessTokenCookie = serialize('accessToken', '', {
        secure: false,
        path: '/',
        expires: new Date(0)
    });

    const headers = new Headers();
    headers.append('Set-Cookie', loggedInCookie);
    headers.append('Set-Cookie', accessTokenCookie);
    headers.append('Content-Type', 'application/json');

    return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
        status: 200,
        headers: headers
    });
}
