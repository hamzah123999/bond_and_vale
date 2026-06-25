/** Cloudinary delivery transforms — reduces bandwidth and transformation quota usage. */

export type CloudinaryVideoOptions = {
    width?: number;
    quality?: "auto" | number;
};

const VIDEO_UPLOAD = /\/video\/upload\//;

function hasDeliveryTransforms(url: string): boolean {
    const segment = url.split("/video/upload/")[1];
    if (!segment) return false;
    return /^(f_|q_|w_|c_|h_|g_)/.test(segment);
}

export function cloudinaryVideo(url: string, options: CloudinaryVideoOptions = {}): string {
    if (!url.includes("res.cloudinary.com") || !VIDEO_UPLOAD.test(url)) {
        return url;
    }

    if (hasDeliveryTransforms(url)) {
        return url;
    }

    const transforms = ["f_auto", options.quality === undefined ? "q_auto" : `q_${options.quality}`];
    if (options.width) transforms.push(`w_${options.width}`);

    return url.replace("/video/upload/", `/video/upload/${transforms.join(",")}/`);
}

export const VIDEO_WIDTH = {
    card: 640,
    scrollTab: 720,
    hero: 960,
    heroDesktop: 1280,
    heroMobile: 720,
} as const;
