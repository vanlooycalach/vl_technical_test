import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

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

  readonly cartCount$ = this.cartService.cartCount$;

  get isDetailPage(): boolean {
    return this.router.url.startsWith('/product/');
  }
}
