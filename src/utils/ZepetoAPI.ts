import axios from 'axios';

export const getImageUrl = async (hashcode: string, photoboothTitle: string, width: string) => {
    const BASE_URL = 'https://render-api.zepeto.io/v2'; // 베이스 URL
    const callUrl = `${BASE_URL}/graphics/zepeto/booth/${photoboothTitle}`;
    const res = await axios({
        method: 'post',
        url: callUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "type": "booth", // booth 타입
            "width": parseInt(width), // 너비
            "target": {
                "hashCodes": hashcode.split(',') // 해시코드
            }
        }
    });
    return res.data.url || undefined;
}


export const getProfileImageUrl = async (hashcode: string) => {
    const photoBooth = [
        'VIDEOBOOTH_349',
        'PHOTOBOOTH_ONE_543',
        'VIDEOBOOTH_CN_17',
        'PHOTOBOOTH_ONE_535',
        'PHOTOBOOTH_ONE_534',
        'PHOTOBOOTH_ONE_529',
        'VIDEOBOOTH_385',
        'PHOTOBOOTH_ONE_482',
        'VIDEOBOOTH_105',
        'VIDEOBOOTH_362',
        'PHOTOBOOTH_ONE_494',
        'VIDEOBOOTH_339'
    ]
    return await getImageUrl(hashcode, photoBooth[Math.floor(Math.random() * photoBooth.length)], '500')
}