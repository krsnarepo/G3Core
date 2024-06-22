import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN } from '../../../constants';

export const authInterceptorFn: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): 
Observable<HttpEvent<any>> => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(request);
};