import { Routes } from '@angular/router';
import { SelectCountryComponent } from './pages/select-country/select-country.component';
import { ShowCountryComponent } from './pages/show-country/show-country.component';

export const routes: Routes = [
    {
        path: '', component: SelectCountryComponent,
        children: [
            {path: 'country/:name', component: ShowCountryComponent}
        ]
    }
];
