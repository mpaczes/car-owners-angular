import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CheckContentTypeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let httpRequestMethod: string = request.method;
    let url: string = request.url;
    let allHttpHeadersNames: string[] | null = request.headers.keys();

    if (httpRequestMethod == 'PUT' || httpRequestMethod == 'POST') {
      if ((url.includes('/bp_owner_api/owners') || url.includes('/bp_vehicle_api/vehicles')) && allHttpHeadersNames.includes('Content-Type')) {
        console.log('HTTP method PUT or POST has got Content-Type HTTP header.');

        return next.handle(request);
      } else if ((url.includes('/bp_owner_api/owners') || url.includes('/bp_vehicle_api/vehicles')) && !allHttpHeadersNames.includes('Content-Type')) {
        console.log('HTTP method PUT or POST does not have Content-Type HTTP header, so it has been added.');

        let newHttpRequest = request.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });

        return next.handle(newHttpRequest);
      }
    }

    console.log('Interceptor does not check HTTP Content-Type header for URL ' + url + ' and request method ' + httpRequestMethod);
    return next.handle(request);
  }
}
