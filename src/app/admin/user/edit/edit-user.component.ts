import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PasswordValidators, EmailValidators } from 'ng2-validators';
import { PasswordService } from '../../../common/security/password.service'
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { FeedbackService } from '../../../common/ui/view/feedback';
import { User } from '../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  	private sub: any;

  	private userSub: FirebaseObjectObservable<User>;

 	private user: User;

  	public form: FormGroup;

	constructor(private router:Router, private af: AngularFire, private route: ActivatedRoute, private feedbackService: FeedbackService) {
	      this.form = new FormGroup({
			  email: new FormControl("", [Validators.required, EmailValidators.normal()]),
			  firstName: new FormControl("", [Validators.required, Validators.minLength(1)]),
			  lastName: new FormControl("", [Validators.required, Validators.minLength(1)]),
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
 
   	update(): void {

   		let user = new User;
 		
   		user.email = this.form.controls['email'].value;
   		user.firstName = this.form.controls['firstName'].value;
   		user.lastName = this.form.controls['lastName'].value;
   		user.salt = this.form.controls['salt'].value;
   		user.password = PasswordService.hashPassword(this.form.controls['password'].value, user.salt);
   		user.role = this.form.controls['role'].value;

   		let items = this.af.database.list('/users');
		items.push(user)
			.then(_ => {
				this.feedbackService.success('User ' + user.email + ' updated.', 'User Updated');
			})
  			.catch(err => {
  				this.feedbackService.error('User ' + user.email + ' update failed.', 'Error Updating User');
  				console.log(err)
  			});
   		
   	}	
  	

	ngOnInit() {

		this.sub = this.route.params.subscribe(params => {
			
	       	this.af.database.object('users/' + params['id']).subscribe(user => {
	       		this.user = user;	       		
	       		this.form.controls['email'].setValue(this.user.email);
	       		this.form.controls['firstName'].setValue(this.user.firstName);
				this.form.controls['lastName'].setValue(this.user.lastName);
				this.form.controls['password'].setValue(this.user.password);
				this.form.controls['role'].setValue(this.user.role);
	       	});	       
	    });

  	}

  	ngOnDestroy() {
    	this.sub.unsubscribe();
  	}

}
