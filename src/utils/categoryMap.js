
// This function converts API categories into simpler categories.
export function mapApiCategoryToDisplay(apiCategory) {
  const normalized = apiCategory.toLowerCase();

  if (normalized.includes("women")) return "women";
  if (normalized.includes("men")) return "men";
  if (normalized.includes("jewel")) return "accessories";
  if (normalized.includes("electronics")) return "electronics";

  // If none of the above
  return "other";
}

// Display labels for UI
export const DISPLAY_LABELS = {
  men: "Men",
  women: "Women",
  accessories: "Accessories",
  electronics: "Electronics",
  other: "Other",
};
