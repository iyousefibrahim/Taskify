import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    {
        path: "", component: AuthLayoutComponent, children: [
            { path: "", redirectTo: "login", pathMatch: 'full' },
            { path: "login", component: LoginComponent, title: "Login" },
            { path: "register", component: RegisterComponent, title: "Register" },
        ]
    },
    { path: "**", component: NotfoundComponent, title: "404" }
];
