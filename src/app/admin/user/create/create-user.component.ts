import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { PasswordValidators, EmailValidators } from 'ng2-validators';
import { FeedbackService } from '../../../common/ui/view/feedback';

import { validateUserName } from '../../../common/validator/username.validator';
import { PasswordService } from '../../../common/security/password.service';
import { User } from '../user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

	public form: FormGroup;

	public roles: Array<any> = [{value:'USER', label: 'User'}, {value:'ADMIN', label: 'Admin'}];

  	constructor(private router: Router, private af: AngularFire, private feedbackService: FeedbackService) {
		this.form = new FormGroup({
			  email: new FormControl("", [Validators.required, EmailValidators.normal(), validateUserName(af)]),
			  firstName: new FormControl("", [Validators.required, Validators.minLength(1)]),
			  lastName: new FormControl("", [Validators.required, Validators.minLength(1)]),
			  role: new FormControl("", [Validators.required]),
			  password: new FormControl("", Validators.compose([
			        PasswordValidators.repeatCharacterRegexRule(4),
			        PasswordValidators.alphabeticalCharacterRule(1),
			        PasswordValidators.digitCharacterRule(1),
			        PasswordValidators.uppercaseCharacterRule(1),
			        Validators.required,
			        Validators.minLength(8)
		    ])),
			  confirmPassword: new FormControl("", [Validators.required, Validators.minLength(8)])
			}, PasswordValidators.mismatchedPasswords('password', 'confirmPassword'));
   	}

   	create(): void {

   		let user = new User;
 		
   		user.email = this.form.controls['email'].value;
   		user.firstName = this.form.controls['firstName'].value;
   		user.lastName = this.form.controls['lastName'].value;
   		user.salt = PasswordService.generateSalt();
   		user.password = PasswordService.hashPassword(this.form.controls['password'].value, user.salt);
		user.role = 'ADMIN';

   		let items = this.af.database.list('/users');
		items.push(user)
			.then(result => {
				this.router.navigate(['/users']);	
				this.feedbackService.success('User ' + user.email + ' created.', 'User Created');			
			})
			.catch(error => {
				this.feedbackService.error('Error creating ' + user.email, 'User Error');
				console.log(error);
			});	
   		
		

   	}
}
