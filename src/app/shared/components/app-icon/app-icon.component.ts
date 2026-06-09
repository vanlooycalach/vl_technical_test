import { Component, input } from '@angular/core';

import { AppIconName } from './app-icon.types';

@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrl: './app-icon.component.scss',
  host: {
    class: 'app-icon',
    '[class.app-icon--sm]': 'size() === "sm"',
    '[class.app-icon--md]': 'size() === "md"',
    '[class.app-icon--lg]': 'size() === "lg"',
    '[class.app-icon--spin]': 'spin()',
    'aria-hidden': 'true',
  },
})
export class AppIconComponent {
  name = input.required<AppIconName>();
  size = input<'sm' | 'md' | 'lg'>('md');
  spin = input(false);
}
