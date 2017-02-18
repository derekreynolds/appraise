import { Injectable }     from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,  RouterStateSnapshot }    from '@angular/router';


import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthenticationGuard implements CanActivate {

	constructor(private authenticationService: AuthenticationService, private router: Router) {
	}

  	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
  		
  		if(!this.authenticationService.isAuthenticated()) 
  			this.router.navigate(['login'])

    	return this.authenticationService.isAuthenticated();
  	}
}
