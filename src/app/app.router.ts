import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './security/user/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ListUserComponent } from './admin/user/list/list-user.component'; 
import { CreateUserComponent } from './admin/user/create/create-user.component';
import { EditUserComponent } from './admin/user/edit/edit-user.component';
import { ShowUserComponent } from './admin/user/show/show-user.component';

import { AuthenticationGuard } from './security';

export const router: Routes = [
		{ path: '', redirectTo: 'login', pathMatch: 'full' },
		{ path: 'login', component: LoginComponent },
		{ path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard] },
		{ path: 'users', component: ListUserComponent, canActivate: [AuthenticationGuard] },
		{ path: 'users/create', component: CreateUserComponent, canActivate: [AuthenticationGuard] },
		{ path: 'users/edit/:id', component: EditUserComponent, canActivate: [AuthenticationGuard] },
		{ path: 'users/:id', component: ShowUserComponent, canActivate: [AuthenticationGuard] }
	];
	

export const routes: ModuleWithProviders = RouterModule.forRoot(router);