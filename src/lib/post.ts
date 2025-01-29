import Server from './axios';

export const createUrl = async (fileName: string) => {
    const res = await Server.post('/api/post/create-url', { fileName });
    return { url: res.data.putUrl, key: res.data.accessToken };
};

export const uploadFile = async (url: string, file: File) => {
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        body: file,
    });
};

export const createPost = async (accessToken: string, description?: string) => {
    await Server.post('/api/post/verify-post', { accessToken, description });
};