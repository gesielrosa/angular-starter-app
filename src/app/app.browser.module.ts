import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserTransferStateModule, TransferState} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {StateTransferInitializerModule} from '@nguniversal/common';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';

import {translateBrowserLoaderFactory} from '@loaders/translate-browser.loader';
import {BrowserStateInterceptor} from '@interceptors/browser-transfer-state.interceptor';

@NgModule({
  imports: [
    AppModule,
    StateTransferInitializerModule,
    BrowserTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true,
    },
    {
      provide: 'ORIGIN_URL',
      useValue: location.origin,
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
  ],
})
export class AppBrowserModule {
}
