// classes/FashionSlugHelper.ts
// Slug format for Fashion: <name-without-accents>-<MongoDB _id>
// Example: ao-thun-trang-640b187e71d9faa9039ff97d

// Create a SEO-friendly slug from the Fashion subject and its _id
export function createFashionSlug(subject: string, id: string): string {
  const sanitizedName = (subject || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // Remove Vietnamese accents
    .replace(/đ/g, 'd') // "đ" is not removed by NFD
    .replace(/[^a-z0-9]+/g, '-') // Replace special characters with hyphens
    .replace(/(^-|-$)+/g, ''); // Trim hyphens from the start and end
  return sanitizedName ? `${sanitizedName}-${id}` : id;
}

// Extract the 24-character MongoDB _id at the end of the slug
export function extractFashionIdFromSlug(slug: string): string | null {
  const match = slug.match(/([a-f0-9]{24})$/i);
  return match ? match[1] : null;
}
