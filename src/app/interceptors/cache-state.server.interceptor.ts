import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { REQUEST } from '@nguniversal/express-engine/tokens';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {

  constructor(
    @Inject(REQUEST) private _request: Request,
    private _transferState: TransferState
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this._transferState.set(makeStateKey(req.url), event.body);
        }
      })
    );
  }

}
