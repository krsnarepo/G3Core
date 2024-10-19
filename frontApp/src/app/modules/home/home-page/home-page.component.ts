import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  
  private userType: string;

  constructor(private authService: AuthService) {
    this.userType = authService.getUserType();
  }

  getUserType(): string {
    return this.userType;
  }
}
