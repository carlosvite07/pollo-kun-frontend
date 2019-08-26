import { Component, OnInit } from '@angular/core';
import { InitialService } from './shared/initial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private intialService : InitialService){}

  ngOnInit(){
    // this.intialService.createAll();
  }
}
