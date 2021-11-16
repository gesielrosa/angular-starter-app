import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';

@Injectable()
export class BrowserStateInterceptor implements HttpInterceptor {

  private _requestedFromCache: string[] = [];

  constructor(
    private _transferState: TransferState,
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this._endpointsCached(req)) {
      return next.handle(req);
    }

    const urlWasRequestedFromCache = this._requestedFromCache.includes(req.url);

    if (!urlWasRequestedFromCache) {
      this._requestedFromCache.push(req.url);

      const storedResponse = this._transferState.get<any>(makeStateKey(req.url), null);

      if (storedResponse) {
        const response = new HttpResponse({body: storedResponse, status: 200});
        return of(response);
      }
    }

    return next.handle(req);
  }

  private _endpointsCached(req: HttpRequest<any>): boolean {
    const getEndpoints = req.method === 'GET';

    return getEndpoints;
  }

}
