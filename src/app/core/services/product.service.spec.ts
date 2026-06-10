import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { API_URL } from '../config/api-url';
import {
  mockListItem,
  mockProductDetail,
} from '../testing/product.fixtures';
import { CacheService } from './cache.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let cache: CacheService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    cache = TestBed.inject(CacheService);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('fetches products from API', () => {
    service.getProducts().subscribe((products) => {
      expect(products).toEqual([mockListItem]);
    });

    const request = httpMock.expectOne(`${API_URL}/api/product`);
    expect(request.request.method).toBe('GET');
    request.flush([mockListItem]);
  });

  it('returns cached products without HTTP call', () => {
    cache.set('products', [mockListItem]);

    service.getProducts().subscribe((products) => {
      expect(products).toEqual([mockListItem]);
    });

    httpMock.expectNone(`${API_URL}/api/product`);
  });

  it('stores products in cache after HTTP response', () => {
    service.getProducts().subscribe();
    httpMock.expectOne(`${API_URL}/api/product`).flush([mockListItem]);

    expect(cache.get('products')).toEqual([mockListItem]);
  });

  it('fetches product detail from API', () => {
    service.getProductById('1').subscribe((product) => {
      expect(product).toEqual(mockProductDetail);
    });

    const request = httpMock.expectOne(`${API_URL}/api/product/1`);
    expect(request.request.method).toBe('GET');
    request.flush(mockProductDetail);
  });

  it('returns cached product detail without HTTP call', () => {
    cache.set('product_1', mockProductDetail);

    service.getProductById('1').subscribe((product) => {
      expect(product).toEqual(mockProductDetail);
    });

    httpMock.expectNone(`${API_URL}/api/product/1`);
  });

  it('stores product detail in cache after HTTP response', () => {
    service.getProductById('1').subscribe();
    httpMock.expectOne(`${API_URL}/api/product/1`).flush(mockProductDetail);

    expect(cache.get('product_1')).toEqual(mockProductDetail);
  });
});
