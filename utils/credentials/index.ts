export function setCredentials(token: string, secret: string) {
    return Buffer.from(`${token}:${secret}`).toString('base64');
}
