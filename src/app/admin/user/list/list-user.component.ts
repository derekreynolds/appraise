import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-lisr-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {

	private users: FirebaseListObservable<any>;

  	constructor(private af: AngularFire) {
	    this.users = af.database.list('/users');	    	   
	}

}
