import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN } from 'src/app/constants';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(ACCESS_TOKEN);
    //const csrfToken = this.getCookie('csrftoken');

    // console.log('Token obtained from localStorage:', token); // Log para depuración

    if (token) {
      //console.log('Cloning request with Authorization header');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      console.log('No token found in localStorage');
    }

    // if (csrfToken) {
    //   request = request.clone({
    //     setHeaders: {
    //       'X-CSRFToken': csrfToken
    //     }
    //   });
    // }

    return next.handle(request);
  }

//   private getCookie(name: string): string | null {
//     const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//     return match ? match[2] : null;
//   }
}
