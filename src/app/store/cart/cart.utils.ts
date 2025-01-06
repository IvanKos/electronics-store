import { Product } from '../../interfaces/product';

export function removeProduct(productsMap: Record<number, Product>, removeId: number): Record<number, Product> {
  const mapCopy = { ...productsMap };
  delete mapCopy[removeId];
  return mapCopy;
}
