import { Component, OnInit, Input } from '@angular/core';
import { ComputersService } from '../computers.service';


@Component({
  selector: 'app-computer-show',
  templateUrl: './computer-show.component.html',
  styleUrls: ['./computer-show.component.scss']
})
export class ComputerShowComponent implements OnInit {
  @Input() client;

  constructor(private computersService:ComputersService) { }

  ngOnInit() {
  }

  end(index: number): void {
    this.computersService.confirmEndComputerRecod(this.client,index);
  }

}
