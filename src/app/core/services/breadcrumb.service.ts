import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly productLabelSubject = new BehaviorSubject<string | null>(null);

  readonly productLabel$ = this.productLabelSubject.asObservable();

  setProductLabel(label: string | null): void {
    this.productLabelSubject.next(label);
  }
}
