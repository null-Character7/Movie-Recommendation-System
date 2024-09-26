export function convertToSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')  // Remove special characters
        .replace(/\s+/g, '-');       // Replace spaces with hyphens
}

export function convertFromSlug(slug: string): string {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
