import {LOCALE_ID, NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TransferState} from '@angular/platform-browser';

import {CookieBackendModule} from 'ngx-cookie-backend';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';

import {translateServerLoaderFactory} from '@common/translate-server.loader';

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
      provide: LOCALE_ID,
      useValue: 'pt',
    },
  ],
})
export class AppServerModule {}
