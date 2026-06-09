import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

import { API_URL } from '../config/api-url';
import { ProductDetail, ProductListItem } from '../models/product.model';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly cache = inject(CacheService);
  private readonly apiUrl = API_URL;

  getProducts(): Observable<ProductListItem[]> {
    const cacheKey = 'products';
    const cached = this.cache.get<ProductListItem[]>(cacheKey);

    if (cached) {
      return of(cached);
    }

    return this.http
      .get<ProductListItem[]>(`${this.apiUrl}/api/product`)
      .pipe(tap((products) => this.cache.set(cacheKey, products)));
  }

  getProductById(id: string): Observable<ProductDetail> {
    const cacheKey = `product_${id}`;
    const cached = this.cache.get<ProductDetail>(cacheKey);

    if (cached) {
      return of(cached);
    }

    return this.http
      .get<ProductDetail>(`${this.apiUrl}/api/product/${id}`)
      .pipe(tap((product) => this.cache.set(cacheKey, product)));
  }
}
