import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TranslateService } from '@ngx-translate/core';
import { Request } from 'express';

import { StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _language: string;

  private readonly _isBrowser: boolean;

  constructor(
    private _translate: TranslateService,
    private _storage: StorageService,
    @Inject(REQUEST) private _request: Request,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) PLATFORM_ID: InjectionToken<Object>
  ) {
    this._isBrowser = isPlatformBrowser(PLATFORM_ID);
  }

  public init(): void {
    const defaultLang = this._getDefaultLanguage();
    this._translate.setDefaultLang(defaultLang);

    const userLanguage = this.getLanguage();
    this.setLanguage(userLanguage ? userLanguage : defaultLang, false);
  }

  public setLanguage(language: string, save: boolean): void {
    this._language = language;
    this._translate.use(language);
    this._document.documentElement.lang = language;

    if (globalThis) {
      globalThis.locale = language;
    }

    if (save) {
      this._storage.setItem('language', language);
    }
  }

  public getLanguage(): string {
    if (!this._language) {
      this._language = this._storage.getItem('language');
    }
    return this._language;
  }

  private _getDefaultLanguage(): string {
    if (!this._isBrowser) {
      const serverLanguage = this._request?.acceptsLanguages()[0]?.toLowerCase() || '';
      return serverLanguage?.includes('pt') ? 'pt-br' : 'en-us';
    } else {
      const browserLanguage = navigator?.language?.toLowerCase() || '';
      return browserLanguage?.includes('pt') ? 'pt-br' : 'en-us';
    }
  }

}
