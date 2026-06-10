import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import {
  TranslateNoOpLoader,
  provideTranslateLoader,
  provideTranslateService,
} from '@ngx-translate/core';
import { of } from 'rxjs';

import { API_URL } from '../../core/config/api-url';
import { CartService } from '../../core/services/cart.service';
import { mockProductDetail } from '../../core/testing/product.fixtures';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let fixture: ComponentFixture<ProductDetailComponent>;
  let component: ProductDetailComponent;
  let httpMock: HttpTestingController;
  let cartService: CartService;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService({
          loader: provideTranslateLoader(TranslateNoOpLoader),
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    cartService = TestBed.inject(CartService);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('loads product detail on init', () => {
    fixture.detectChanges();

    httpMock.expectOne(`${API_URL}/api/product/1`).flush(mockProductDetail);
    fixture.detectChanges();

    expect(component.product).toEqual(mockProductDetail);
    expect(component.selectedStorageCode).toBe(2000);
    expect(component.selectedColorCode).toBe(1000);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeFalse();
  });

  it('shows error when product load fails', () => {
    fixture.detectChanges();

    httpMock
      .expectOne(`${API_URL}/api/product/1`)
      .error(new ProgressEvent('error'));
    fixture.detectChanges();

    expect(component.error).toBeTrue();
    expect(component.product).toBeNull();
    expect(component.loading).toBeFalse();
  });

  it('adds product to cart with selected options', () => {
    fixture.detectChanges();

    httpMock.expectOne(`${API_URL}/api/product/1`).flush(mockProductDetail);
    fixture.detectChanges();

    component.addToCart();

    const request = httpMock.expectOne(`${API_URL}/api/cart`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      id: '1',
      colorCode: 1000,
      storageCode: 2000,
    });

    request.flush({ count: 1 });
    fixture.detectChanges();

    expect(component.adding).toBeFalse();
    expect(component.addError).toBeFalse();
    expect(cartService.cartCount).toBe(1);
  });

  it('shows error when add to cart fails', () => {
    fixture.detectChanges();

    httpMock.expectOne(`${API_URL}/api/product/1`).flush(mockProductDetail);
    fixture.detectChanges();

    component.addToCart();

    httpMock
      .expectOne(`${API_URL}/api/cart`)
      .error(new ProgressEvent('error'));
    fixture.detectChanges();

    expect(component.adding).toBeFalse();
    expect(component.addError).toBeTrue();
  });
});

describe('ProductDetailComponent without route id', () => {
  let fixture: ComponentFixture<ProductDetailComponent>;
  let component: ProductDetailComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService({
          loader: provideTranslateLoader(TranslateNoOpLoader),
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({})),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('shows error when route id is missing', () => {
    fixture.detectChanges();

    expect(component.error).toBeTrue();
    expect(component.loading).toBeFalse();
    httpMock.expectNone(`${API_URL}/api/product/1`);
  });
});
