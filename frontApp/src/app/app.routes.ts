import { Routes } from '@angular/router';
import { AuthComponent } from './core/login/auth/auth.component';
import { authGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard] },
    { path: 'login', component: AuthComponent },
    { path: 'logout', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full'}
];
