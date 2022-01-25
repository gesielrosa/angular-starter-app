import {Observable} from 'rxjs';
import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

import {TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export class TranslateBrowserLoader implements TranslateLoader {
  constructor(private _http: HttpClient, private _transferState: TransferState) {}

  public getTranslation(lang: string): Observable<any> {
    const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
    const data = this._transferState.get(key, null);

    if (data) {
      return new Observable((observer) => {
        observer.next(data);
        observer.complete();
      });
    } else {
      return new TranslateHttpLoader(this._http, './assets/i18n/', '.json').getTranslation(lang);
    }
  }
}

export function translateBrowserLoaderFactory(httpClient: HttpClient, transferState: TransferState) {
  return new TranslateBrowserLoader(httpClient, transferState);
}
