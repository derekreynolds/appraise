import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute, Router } from '@angular/router';

import { FeedbackService } from '../../../common/ui/view/feedback';
import  { User } from '../user';


@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

 	private sub: any;

 	@Output()
 	private user: User;


  	constructor(private router: Router, private af: AngularFire, private route: ActivatedRoute, private feedbackService: FeedbackService) {
	       	   
	}

	ngOnInit() {

		this.sub = this.route.params.subscribe(params => {
	       this.af.database.object('users/' + params['id']).subscribe(user => {	       		
	       		this.user = user;
	       });
	    });

  	}

  	ngOnDestroy() {
    	this.sub.unsubscribe();
  	}

  	onClickEdit() {  		
  		this.router.navigate(['/users/edit/', this.user['$key']]);
  	}

  	onClickDelete() {
  		const itemObservable = this.af.database.object('/users/' + this.user['$key']);
		itemObservable.remove();
		this.feedbackService.success('User has been deleted.', 'User deleted.');	
  		this.router.navigate(['/users']);
  	}

}
