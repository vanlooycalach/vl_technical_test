import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('stores and returns cached data', () => {
    service.set('products', [{ id: '1' }]);

    expect(service.get('products')).toEqual([{ id: '1' }]);
  });

  it('returns null when cache expires', () => {
    service.set('products', ['item']);

    const key = 'itx_cache_products';
    const entry = JSON.parse(localStorage.getItem(key) as string);
    entry.expiresAt = Date.now() - 1;
    localStorage.setItem(key, JSON.stringify(entry));

    expect(service.get('products')).toBeNull();
  });
});
