import { filterProductsByQuery } from './product-filter';

describe('filterProductsByQuery', () => {
  const products = [
    {
      id: '1',
      brand: 'Acer',
      model: 'Liquid Z6',
      price: '120',
      imgUrl: '',
    },
    {
      id: '2',
      brand: 'Samsung',
      model: 'Galaxy S21',
      price: '800',
      imgUrl: '',
    },
  ];

  it('returns all products when query is empty', () => {
    expect(filterProductsByQuery(products, '')).toEqual(products);
    expect(filterProductsByQuery(products, '   ')).toEqual(products);
  });

  it('filters by brand', () => {
    expect(filterProductsByQuery(products, 'acer')).toEqual([products[0]]);
  });

  it('filters by model', () => {
    expect(filterProductsByQuery(products, 'galaxy')).toEqual([products[1]]);
  });

  it('is case insensitive', () => {
    expect(filterProductsByQuery(products, 'LIQUID')).toEqual([products[0]]);
  });
});
