import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthenticationService {

	private authenticated: boolean = false;

	constructor(private af: AngularFire) {
		this.af.auth.subscribe(auth => {
			console.log(auth);
			this.authenticated = true;
		});
	}

	login(email: string, password: string) {
		this.af.auth.login({
		  email: email,
		  password: password,
		},
		{
		  provider: AuthProviders.Password,
		  method: AuthMethods.Password,
		});
	}

	logout() {
		this.af.auth.logout();
	}

	isAuthenticated() : boolean {
		return this.authenticated;
	}

}
