import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { ProductListItem } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe, RouterLink, TranslatePipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  product = input.required<ProductListItem>();

  formatPrice(price: string): number | null {
    if (!price.trim()) {
      return null;
    }

    const value = Number(price);

    return Number.isNaN(value) ? null : value;
  }
}
