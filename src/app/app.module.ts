import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularLocaleRegistrarService } from './angular-locale.service';
import { ComponentAComponent } from './component-a/component-a.component';
import { ComponentBComponent } from './component-b/component-b.component';

export const initializerProvider = (appInitializer: any) => {
  return {
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    deps: [AngularLocaleRegistrarService],
    multi: true
  };
};

export function appInitializerFactory(
  angularLocaleService: AngularLocaleRegistrarService,
): () => Promise<any> {
  return () => {
    const locale = prompt('Please provide a locale identifier e.g. en-GB, en-US, de-DE etc', 'en-US');
    return angularLocaleService.setLocale(locale);
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ComponentAComponent,
    ComponentBComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    initializerProvider(appInitializerFactory),
    {
      provide: LOCALE_ID,
      deps: [AngularLocaleRegistrarService],
      useFactory: ((angularLocaleService: AngularLocaleRegistrarService) => angularLocaleService.getLocale())
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      deps: [AngularLocaleRegistrarService],
      useFactory: ((angularLocaleService: AngularLocaleRegistrarService) => angularLocaleService.getCurrency())
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
