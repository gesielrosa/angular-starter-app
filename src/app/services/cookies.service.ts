import {Injectable} from '@angular/core';

import {CookieService as NgxCookieService} from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private _cookieService: NgxCookieService) {
  }

  public setItem(key: string, value: string): void {
    this._cookieService.put(key, value);
  }

  public setObjectItem(key: string, value: any): void {
    this._cookieService.putObject(key, value);
  }

  public getItem(key: string): string {
    return this._cookieService.get(key);
  }

  public getObjectItem(key: string): any {
    return this._cookieService.getObject(key);
  }

  public removeItem(key: string): void {
    this._cookieService.remove(key);
  }

  public removeAll(): void {
    this._cookieService.removeAll();
  }
}
