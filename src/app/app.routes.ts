import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { WorkoutPageComponent } from './pages/workout-page/workout-page.component';
import { FoodPageComponent } from './pages/food-page/food-page.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent,

    },
    {
        path: '',
        component: HomePageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'report',
        component: ReportPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'workout',
        component: WorkoutPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'food',
        component: FoodPageComponent,
        canActivate: [AuthGuard],
    }
];
