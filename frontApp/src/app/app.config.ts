import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './core/login/services/auth.service';
import { authInterceptorFn } from './shared/interceptors/auth.interceptor';
import { authGuard } from './shared/guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    AuthService,
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
