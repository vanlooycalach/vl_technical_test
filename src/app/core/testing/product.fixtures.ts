import { ProductDetail, ProductListItem } from '../models/product.model';

export const mockListItem: ProductListItem = {
  id: '1',
  brand: 'Acer',
  model: 'Liquid Z6',
  price: '120',
  imgUrl: 'https://example.com/acer.png',
};

export const mockListItemTwo: ProductListItem = {
  id: '2',
  brand: 'Samsung',
  model: 'Galaxy S21',
  price: '800',
  imgUrl: 'https://example.com/samsung.png',
};

export const mockProductDetail: ProductDetail = {
  ...mockListItem,
  cpu: 'Quad Core',
  ram: '2GB',
  os: 'Android',
  displaySize: '5"',
  displayResolution: '720p',
  battery: '2000mAh',
  primaryCamera: '13 MP',
  secondaryCmera: '5 MP',
  dimentions: '100 x 50 x 8 mm',
  weight: '150',
  colors: ['Black'],
  options: {
    colors: [{ code: 1000, name: 'Black' }],
    storages: [{ code: 2000, name: '16GB' }],
  },
};
