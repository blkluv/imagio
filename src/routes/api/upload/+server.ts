import { json } from '@sveltejs/kit';

export async function GET() {
    return json({
        message: 'You can only use POST method in this endpoint.'
    })
}

export async function POST({ fetch, request, platform }) {
    if (platform) {
        const UPLOAD_URL = `https://api.cloudflare.com/client/v4/accounts/${platform.env.ACCOUNT_ID}/images/v1`
        const req = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Headers': 'Authorization',
                'Authorization': `Bearer ${platform.env.CF_IMAGES_API_KEY}`
            },
            body: await request.formData()
        }
        return fetch(UPLOAD_URL, req);
    } else {
        return json({
            message: '401 Unauthorized.'
        })
    }
}