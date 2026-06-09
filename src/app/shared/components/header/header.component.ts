import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly breadcrumbService = inject(BreadcrumbService);

  readonly cartCount$ = this.cartService.cartCount$;
  readonly productLabel$ = this.breadcrumbService.productLabel$;

  get isDetailPage(): boolean {
    return this.router.url.startsWith('/product/');
  }
}
