import { get, post } from "../util/fetch";

export default async function getHeaderImage() {
    return get('/api/public/settings');
}

export async function getBannerData(slug: string) {
    return get(`/api/public/banners/${slug}`);
}

export async function getSliderData(slug: string) {
    return get(`/api/public/sliders/${slug}`);
}

export async function getOurBrands() {
    return get('/api/public/our-brands');
}

export async function getSectors() {
    return get('/api/public/sectors');
}

export async function postContactUs(data: any) {
    return post('/api/public/contact-us', data);
}