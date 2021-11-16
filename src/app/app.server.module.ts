import { LOCALE_ID, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TransferState } from '@angular/platform-browser';

import { CookieBackendService, CookieService } from '@gorniv/ngx-universal';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { translateServerLoaderFactory } from '@common/translate-server.loader';
import { ServerStateInterceptor } from '@interceptors/cache-state.server.interceptor';

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
        deps: [TransferState]
      }
    })
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true
    },
    {
      provide: CookieService,
      useClass: CookieBackendService
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ]
})
export class AppServerModule {
}
