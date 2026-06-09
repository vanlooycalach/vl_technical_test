import { ProductListItem } from '../models/product.model';

export function filterProductsByQuery(
  products: ProductListItem[],
  query: string,
): ProductListItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return products;
  }

  return products.filter(
    (product) =>
      product.brand.toLowerCase().includes(normalizedQuery) ||
      product.model.toLowerCase().includes(normalizedQuery),
  );
}
