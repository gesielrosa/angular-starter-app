import {LOCALE_ID, NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TransferState} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {CookieBackendModule} from 'ngx-cookie-backend';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';

import {translateServerLoaderFactory} from '@common/translate-server.loader';
import {ServerTransferStateInterceptor} from '@interceptors/server-transfer-state.interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState],
      },
    }),
    CookieBackendModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerTransferStateInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
  ],
})
export class AppServerModule {}
