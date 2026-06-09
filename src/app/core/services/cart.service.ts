import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  AddToCartPayload,
  AddToCartResponse,
} from '../models/product.model';

const CART_COUNT_KEY = 'itx_cart_count';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly cartCountSubject = new BehaviorSubject<number>(
    this.readStoredCount(),
  );

  readonly cartCount$ = this.cartCountSubject.asObservable();

  get cartCount(): number {
    return this.cartCountSubject.value;
  }

  addToCart(payload: AddToCartPayload): Observable<number> {
    return this.http
      .post<AddToCartResponse>(`${this.apiUrl}/api/cart`, payload)
      .pipe(
        tap((response) => this.saveCount(response.count)),
        map((response) => response.count),
      );
  }

  private readStoredCount(): number {
    const stored = localStorage.getItem(CART_COUNT_KEY);
    const count = stored ? Number(stored) : 0;

    return Number.isNaN(count) ? 0 : count;
  }

  private saveCount(count: number): void {
    localStorage.setItem(CART_COUNT_KEY, String(count));
    this.cartCountSubject.next(count);
  }
}
