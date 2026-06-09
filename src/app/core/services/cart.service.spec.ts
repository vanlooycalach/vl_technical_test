import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { API_URL } from '../config/api-url';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('posts cart payload to API', () => {
    const payload = {
      id: 'product-id',
      colorCode: 1000,
      storageCode: 2000,
    };

    service.addToCart(payload).subscribe((count) => {
      expect(count).toBe(1);
    });

    const request = httpMock.expectOne(`${API_URL}/api/cart`);
    expect(request.request.method).toBe('POST');
    expect(request.request.withCredentials).toBeFalse();
    expect(request.request.body).toEqual(payload);

    request.flush({ count: 1 });
  });

  it('increments count when API keeps returning 1', () => {
    const payload = {
      id: 'product-id',
      colorCode: 1000,
      storageCode: 2000,
    };

    service.addToCart(payload).subscribe();
    httpMock.expectOne(`${API_URL}/api/cart`).flush({ count: 1 });

    service.addToCart(payload).subscribe((count) => {
      expect(count).toBe(2);
    });

    httpMock.expectOne(`${API_URL}/api/cart`).flush({ count: 1 });
    expect(service.cartCount).toBe(2);
  });

  it('uses API count when it is higher than local count', () => {
    const payload = {
      id: 'product-id',
      colorCode: 1000,
      storageCode: 2000,
    };

    service.addToCart(payload).subscribe();
    httpMock.expectOne(`${API_URL}/api/cart`).flush({ count: 1 });

    service.addToCart(payload).subscribe((count) => {
      expect(count).toBe(3);
    });

    httpMock.expectOne(`${API_URL}/api/cart`).flush({ count: 3 });
    expect(service.cartCount).toBe(3);
  });
});
