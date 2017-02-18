import { Injectable } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class FeedbackService {

	constructor(private toastr: ToastsManager) {
		
	}

	public success(title: string, message: string, options?: any) {
		this.toastr.success(title, message, options);
	}

	public error(title: string, message: string, options?: any) {
		this.toastr.error(title, message, options);
	}

	public warn(title: string, message: string, options?: any) {
		this.toastr.warning(title, message, options);
	}

	public info(title: string, message: string, options?: any) {
		this.toastr.info(title, message, options);
	}
}