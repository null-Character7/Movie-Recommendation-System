/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'image.tmdb.org', // Allow images from this domain
            'm.media-amazon.com', // Allow images from this domain
            'via.placeholder.com', // Allow images from this domain
            'assets.aceternity.com'
        ],
    },
};

export default nextConfig;
