import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser';

import {TranslateLoader} from '@ngx-translate/core';
import {join} from 'path';
import {Observable} from 'rxjs';
import * as fs from 'fs';

import {environment} from '@env/environment';

export class TranslateServerLoader implements TranslateLoader {
  constructor(
    private _transferState: TransferState,
    private _prefix: string = 'i18n',
    private _suffix: string = '.json'
  ) {}

  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      const assets_folder = join(process.cwd(), 'dist', environment.appId, 'browser', 'assets', this._prefix);

      const jsonData = JSON.parse(fs.readFileSync(`${assets_folder}/${lang}${this._suffix}`, 'utf8'));

      // Here we save the translations in the transfer-state
      const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      this._transferState.set(key, jsonData);

      observer.next(jsonData);
      observer.complete();
    });
  }
}

export function translateServerLoaderFactory(transferState: TransferState) {
  return new TranslateServerLoader(transferState);
}
