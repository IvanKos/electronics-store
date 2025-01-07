import { Product, ProductsFilter } from '../../interfaces/product';

export function filterProducts(products: Product[], filter: ProductsFilter): Product[] {
  const res = products.filter(product => {
    const matchesName = filter.name ? product.name.toLowerCase().includes(filter.name.toLowerCase()) : true;
    const matchesCategory = filter.category ? product.category === filter.category : true;
    const matchesMinPrice = filter.price?.min ? product.price >= filter.price.min : true;
    const matchesMaxPrice = filter.price?.max ? product.price <= filter.price.max : true;
    return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  return res;
}
