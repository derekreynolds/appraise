import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import  { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

 private myForm: FormGroup;
  
  constructor(private router: Router, fb: FormBuilder, private authenticationService: AuthenticationService) {
	this.myForm = fb.group({  
      'email': ['', Validators.required],
      'password': ['', Validators.required]  
    });  
  }

  onSubmit() {
  	
  	this.authenticationService.login(this.myForm.controls['email'].value, this.myForm.controls['password'].value);

  	if(this.authenticationService.isAuthenticated()) {
  		this.router.navigate(['admin']);
  	}
  }

}