import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-work-show',
  templateUrl: './work-show.component.html',
  styleUrls: ['./work-show.component.scss']
})
export class WorkShowComponent {
  @Input() client;
  constructor() { }

}
