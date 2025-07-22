export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')  // فاصله و کاراکترهای خاص → -
    .replace(/^-+|-+$/g, '');     // حذف خط تیره اضافه ابتدا/انتها
}
