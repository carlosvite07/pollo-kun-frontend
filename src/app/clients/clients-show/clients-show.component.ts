import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clients-show',
  templateUrl: './clients-show.component.html',
  styleUrls: ['./clients-show.component.scss']
})
export class ClientsShowComponent implements OnInit {
  @Input() client;
  constructor() { }

  ngOnInit() {

  }

}
