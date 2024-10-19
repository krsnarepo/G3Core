import { Component } from '@angular/core';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { LoginPageComponent } from './modules/auth/login-page/login-page.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // imports: [HomePageComponent,LoginPageComponent,NavComponent,FooterComponent],
  // standalone : True
})
export class AppComponent {
  title = 'fronted';
}
