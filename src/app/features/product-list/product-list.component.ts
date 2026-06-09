import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ProductListItem } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { ProductItemComponent } from '../../shared/components/product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductItemComponent, TranslatePipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private readonly productService = inject(ProductService);

  products: ProductListItem[] = [];
  loading = true;
  error = false;

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
