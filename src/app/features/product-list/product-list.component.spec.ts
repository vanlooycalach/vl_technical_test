import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import {
  TranslateNoOpLoader,
  provideTranslateLoader,
  provideTranslateService,
} from '@ngx-translate/core';

import { API_URL } from '../../core/config/api-url';
import {
  mockListItem,
  mockListItemTwo,
} from '../../core/testing/product.fixtures';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let component: ProductListComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService({
          loader: provideTranslateLoader(TranslateNoOpLoader),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('loads products on init', () => {
    fixture.detectChanges();

    httpMock.expectOne(`${API_URL}/api/product`).flush([mockListItem]);
    fixture.detectChanges();

    expect(component.allProducts).toEqual([mockListItem]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeFalse();
  });

  it('shows error when API fails', () => {
    fixture.detectChanges();

    httpMock
      .expectOne(`${API_URL}/api/product`)
      .error(new ProgressEvent('error'));
    fixture.detectChanges();

    expect(component.error).toBeTrue();
    expect(component.loading).toBeFalse();
    expect(component.allProducts).toEqual([]);
  });

  it('filters products by search query', () => {
    fixture.detectChanges();

    httpMock
      .expectOne(`${API_URL}/api/product`)
      .flush([mockListItem, mockListItemTwo]);
    fixture.detectChanges();

    component.searchQuery = 'acer';

    expect(component.filteredProducts).toEqual([mockListItem]);
  });
});
