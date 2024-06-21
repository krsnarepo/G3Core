import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../../constants';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.loading = true;
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.loading = false;
      },
      error: (err) => {
        alert(err.message);
        this.loading = false;
      }
    });
  }

  async Submit(): Promise<void> {
    this.loading = true;
    const { username, password } = this.loginForm.value;
    try {
      const response = await this.authService.login(username, password).toPromise();
      localStorage.setItem(ACCESS_TOKEN, response.access);
      localStorage.setItem(REFRESH_TOKEN, response.refresh);
      this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
      alert('Error al iniciar sesión');
    } finally {
      this.loading = false;
    }
  }
  
}
