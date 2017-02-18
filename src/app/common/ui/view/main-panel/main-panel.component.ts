import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent {

	@Input()
	private title: String;


}
