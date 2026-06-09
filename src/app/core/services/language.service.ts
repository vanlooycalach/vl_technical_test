import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const SUPPORTED_LANGUAGES = ['es', 'en'] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translate = inject(TranslateService);

  init(): void {
    this.translate.addLangs([...SUPPORTED_LANGUAGES]);
    this.translate.setFallbackLang('es');

    const lang = this.getBrowserLanguage();
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }

  private getBrowserLanguage(): SupportedLanguage {
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith('en')) {
      return 'en';
    }

    if (browserLang.startsWith('es')) {
      return 'es';
    }

    return 'es';
  }
}
