import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'setting', component: SettingsComponent }
];