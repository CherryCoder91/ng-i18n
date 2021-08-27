
import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { of } from 'rxjs';
/**
 * Service that acts as a registrar for local CLDR data.
 * If not registered when set, locale details are acquired and then set as current.
 * If details are known, they are not re registered, just added as current.
 */
@Injectable({
  providedIn: 'root'
})
export class AngularLocaleRegistrarService {

  private activeLang: string;
  private activeCurrency: string;
  private readonly appDefaultLanguage = 'en-US';
  private readonly appDefaultCurrency = 'USD';

  private readonly registrations = new Map<string, LocaleRegistration>();

  public getLocale(): string {
    return this.activeLang || this.appDefaultLanguage;
  }

  public getCurrency(): string {
    return this.activeCurrency || this.appDefaultCurrency;
  }

  public setLocale(locale: string): Promise<void> {
    const existingRegistration = this.registrations.get(locale);
    if (existingRegistration) {
      this.activeLang = existingRegistration.locale;
      this.activeCurrency = existingRegistration.currency;
      return of<void>().toPromise();
    }
    else {
      return this.importLocaleDataAndSetLocaleFor(locale);
    }
  }

  public importLocaleDataAndSetLocaleFor(locale: string): Promise<void> {
    return import(`@angular/common/locales/${locale}.js`)
      .then(
        (localeModule) => this.registerLocaleDataWith(localeModule, locale),
        () => {
          const fallbackLocale = locale.split('-')[0];
          return import(`@angular/common/locales/${fallbackLocale}.js`)
            .then((fallbackLocaleModule) => this.registerLocaleDataWith(fallbackLocaleModule, locale));
        }
      );
  }

  private registerLocaleDataWith(localeModule: any, locale: string): void {
    registerLocaleData(localeModule.default, locale);

    this.registrations.set(locale, { locale, currency: localeModule.default[15] });

    this.activeLang = locale;
    this.activeCurrency = localeModule.default[15];

    console.log('Setting locale token for: ' + locale);
    console.log('Module was:');
    console.log(localeModule);
  }
}

export interface LocaleRegistration {
  locale: string;
  currency: string;
}
