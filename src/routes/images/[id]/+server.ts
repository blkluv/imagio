export async function DELETE({ fetch, platform, params: { id } }) {
    if (platform) {
        const ENDPOINT = `https://api.cloudflare.com/client/v4/accounts/${platform.env.ACCOUNT_ID}/images/v1/${id}`
        const req = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${platform.env.CF_IMAGES_API_KEY}`
            },
        };
        const prefix = await platform.env.IMAGIO_KV.get(id)
        await platform.env.IMAGIO_KV.delete(`${prefix}:${id}`)
        await platform.env.IMAGIO_KV.delete(id)
        return fetch(ENDPOINT, req)
    }
}
