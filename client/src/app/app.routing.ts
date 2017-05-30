import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './containers/homePage/homePage.container';
import { ShowPost } from './containers/ShowPost/showpost.container';
import { Registration } from './components/Registration/registration.component';
import { LogInPage } from './containers/LogInPage/login.container';
import { LogOut } from './components/LogOut/logout.componet';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'signup', component: Registration },
  { path: 'login', component: LogInPage },
  { path: 'logout', component: LogOut },
  { path: 'post/:id', component: ShowPost }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
