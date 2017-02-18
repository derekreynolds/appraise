import { FormControl, ValidatorFn } from '@angular/forms';
import { AngularFire } from 'angularfire2';


export function validateUserName(af: AngularFire): ValidatorFn {
	return (control: FormControl) => {    	

		let alreadyExists = false;
		let finished = false;

    	const queryObservable = af.database.list('/users', {
		  query: {
		    orderByChild: 'email',
		    equalTo: control.value 
		  }
		});

        queryObservable.subscribe(queriedItems => {        	
        	if(queriedItems.length > 0) {
		 		alreadyExists = true;
		 		finished = true;
        	}
		 	
		});
       
       	//while(!finished) {
        //	setTimeout(function() {}, 1000);
    	//}

       	return alreadyExists ? {'userExists': true} : null;
	}
}	
