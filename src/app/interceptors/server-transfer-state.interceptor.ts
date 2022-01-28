import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class ServerTransferStateInterceptor implements HttpInterceptor {
  constructor(private _transferState: TransferState) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && (event.status === 200 || event.status === 202)) {
          this._transferState.set(makeStateKey(req.url), event.body);
        }
      })
    );
  }
}
