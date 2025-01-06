import { Product } from '../../interfaces/product';

export function removeProduct(products: Product[], removeId: number): Product[] {
    return products.filter(product => product.id !== removeId);
}
