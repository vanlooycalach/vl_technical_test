import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { EMPTY, Subscription, switchMap } from 'rxjs';

import { ProductDetail } from '../../core/models/product.model';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { formatList } from '../../core/utils/product-format';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private routeSub?: Subscription;

  product: ProductDetail | null = null;
  selectedStorageCode: number | null = null;
  selectedColorCode: number | null = null;
  loading = true;
  error = false;
  adding = false;
  addError = false;

  ngOnInit(): void {
    this.routeSub = this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');

          if (!id) {
            this.error = true;
            this.loading = false;
            this.breadcrumbService.setProductLabel(null);
            return EMPTY;
          }

          this.loading = true;
          this.error = false;
          this.addError = false;

          return this.productService.getProductById(id);
        }),
      )
      .subscribe({
        next: (product) => {
          this.product = product;
          this.selectedStorageCode = product.options.storages[0]?.code ?? null;
          this.selectedColorCode = product.options.colors[0]?.code ?? null;
          this.breadcrumbService.setProductLabel(`${product.brand} ${product.model}`);
          this.loading = false;
        },
        error: () => {
          this.product = null;
          this.breadcrumbService.setProductLabel(null);
          this.error = true;
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.breadcrumbService.setProductLabel(null);
  }

  addToCart(): void {
    if (
      !this.product ||
      this.selectedStorageCode === null ||
      this.selectedColorCode === null
    ) {
      return;
    }

    this.adding = true;
    this.addError = false;

    this.cartService
      .addToCart({
        id: this.product.id,
        colorCode: this.selectedColorCode,
        storageCode: this.selectedStorageCode,
      })
      .subscribe({
        next: () => {
          this.adding = false;
        },
        error: () => {
          this.adding = false;
          this.addError = true;
        },
      });
  }

  formatPrice(price: string): number | null {
    if (!price.trim()) {
      return null;
    }

    const value = Number(price);

    return Number.isNaN(value) ? null : value;
  }

  readonly formatList = formatList;
}
