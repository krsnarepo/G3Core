import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './modules/auth/login-page/login-page.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './modules/auth/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './modules/auth/interceptors/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { OrderStateServiceService } from './modules/payment/services/order-state-service.service';

const appRoutes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'home', component: HomePageComponent},
];


@NgModule({

  declarations: [
    AppComponent,
    // MobilityDeliveryPageComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  
  providers: [
    AuthService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
