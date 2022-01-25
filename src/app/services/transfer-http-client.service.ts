import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

import {from, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransferHttpClient {
  constructor(
    private _transferState: TransferState,
    private _httpClient: HttpClient,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
  }

  public request<T>(
    method: string,
    uri: string | Request,
    options?: {
      body?: any;
      headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
      };
      reportProgress?: boolean;
      observe?: 'response';
      params?:
        | HttpParams
        | {
        [param: string]: string | string[];
      };
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this._getData<T>(method, uri, options, (method: string, url: string | Request, options: any) => {
      return this._httpClient.request<T>(method, url as string, options);
    });
  }

  /**
   * Performs a request with `get` http method.
   */
  public get<T>(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
      };
      observe?: 'response';
      params?:
        | HttpParams
        | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this._getData<T>('get', url, options, (_method: string, url: string | Request, options: any) => {
      return this._httpClient.get<T>(url as string, options);
    });
  }

  /**
   * Performs a request with `post` http method.
   */
  public post<T>(
    url: string,
    body: any,
    options?: {
      headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
      };
      observe?: 'response';
      params?:
        | HttpParams
        | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this._getPostData<T>(
      'post',
      url,
      body,
      options,
      (_method: string, url: string | Request, body: any, options: any) => {
        return this._httpClient.post<T>(url as string, body, options);
      }
    );
  }

  /**
   * Performs a request with `put` http method.
   */
  public put<T>(
    url: string,
    _body: any,
    options?: {
      headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      params?:
        | HttpParams
        | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this._getPostData<T>(
      'put',
      url,
      _body,
      options,
      (_method: string, url: string | Request, _body: any, options: any) => {
        return this._httpClient.put<T>(url as string, _body, options);
      }
    );
  }

  /**
   * Performs a request with `delete` http method.
   */
  public delete<T>(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
      };
      observe?: 'response';
      params?:
        | HttpParams
        | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this._getData<T>('delete', url, options, (_method: string, url: string | Request, options: any) => {
      return this._httpClient.delete<T>(url as string, options);
    });
  }

  /**
   * Performs a request with `patch` http method.
   */
  public patch<T>(
    url: string,
    body: any,
    options?: {
      headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
      };
      observe?: 'response';
      params?:
        | HttpParams
        | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this._getPostData<T>(
      'patch',
      url,
      body,
      options,
      (_method: string, url: string | Request, body: any, options: any): Observable<any> => {
        return this._httpClient.patch<T>(url as string, body, options);
      }
    );
  }

  /**
   * Performs a request with `head` http method.
   */
  public head<T>(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
      };
      observe?: 'response';
      params?:
        | HttpParams
        | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this._getData<T>('head', url, options, (_method: string, url: string | Request, options: any) => {
      return this._httpClient.head<T>(url as string, options);
    });
  }

  /**
   * Performs a request with `options` http method.
   */
  public options<T>(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
      };
      observe?: 'response';
      params?:
        | HttpParams
        | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this._getData<T>(
      'options',
      url,
      options,
      (_method: string, url: string | Request, options: any) => {
        return this._httpClient.options<T>(url as string, options);
      }
    );
  }

  private _getData<T>(
    method: string,
    uri: string | Request,
    options: any,
    callback: (method: string, uri: string | Request, options: any) => Observable<any>
  ): Observable<T> {
    let url = uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const tempKey = url + (options ? JSON.stringify(options) : '');
    const key = makeStateKey<T>(tempKey);
    try {
      return this._resolveData<T>(key);
    } catch (e) {
      return callback(method, uri, options).pipe(
        tap((data: T) => {
          if (isPlatformBrowser(this._platformId)) {
            // Client only code.
            // nothing;
          }
          if (isPlatformServer(this._platformId)) {
            this._setCache<T>(key, data);
          }
        })
      );
    }
  }

  private _getPostData<T>(
    _method: string,
    uri: string | Request,
    body: any,
    options: any,
    callback: (method: string, uri: string | Request, body: any, options: any) => Observable<any>
  ): Observable<T> {
    let url = uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const tempKey = url + (body ? JSON.stringify(body) : '') + (options ? JSON.stringify(options) : '');
    const key = makeStateKey<T>(tempKey);

    try {
      return this._resolveData<T>(key);
    } catch (e) {
      return callback(_method, uri, body, options).pipe(
        tap((data: T) => {
          if (isPlatformBrowser(this._platformId)) {
            // Client only code.
            // nothing;
          }
          if (isPlatformServer(this._platformId)) {
            this._setCache<T>(key, data);
          }
        })
      );
    }
  }

  private _resolveData<T>(key: StateKey<T>): Observable<T> {
    const data = this._getFromCache<T>(key);

    if (!data) {
      throw new Error();
    }

    if (isPlatformBrowser(this._platformId)) {
      // Client only code.
      this._transferState.remove(key);
    }
    if (isPlatformServer(this._platformId)) {
      // Server only code.
    }

    return from(Promise.resolve<T>(data));
  }

  private _setCache<T>(key: StateKey<T>, data: T): void {
    return this._transferState.set<T>(key, data);
  }

  private _getFromCache<T>(key: StateKey<T>): T {
    return this._transferState.get<T>(key, null);
  }
}
