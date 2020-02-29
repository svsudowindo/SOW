import { LocalStorageEnums } from './../../constants/localstorage-enums';
import { StorageService } from './../common/storage.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptorsService {

  constructor(
    private storageService: StorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const defaultHeaders = {
      'Content-Type': 'application/json; charset=UTF-8'
    };
    const authToken = this.storageService.getLocalStorageItem(LocalStorageEnums.TOKEN);
    if (authToken) {
      defaultHeaders['Authorization'] = authToken;
    }
    if (req.headers.keys().length > 0) {   // This replaces default headers if any headers passed at the request time
      req.headers.keys().forEach((headerKey) => {
        if (headerKey === 'Content-Type' && req.headers.get(headerKey) === 'multipart/form-data') {
          delete defaultHeaders['Content-Type'];
        } else {
          defaultHeaders[headerKey] = req.headers.get(headerKey);
        }
      });
    }

    const modifiedReq = req.clone({
      headers: new HttpHeaders(defaultHeaders),
    });
    return next.handle(modifiedReq);
  }
}
