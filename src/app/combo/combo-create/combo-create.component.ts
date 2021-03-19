import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../clients/client.model';
import { ComboService } from '../combo.service';

@Component({
  selector: 'app-combo-create',
  templateUrl: './combo-create.component.html',
  styleUrls: ['./combo-create.component.scss']
})
export class ComboCreateComponent implements OnInit {
  @Input() client: Client;

  constructor(private comboService: ComboService) {}

  ngOnInit() {}

  showComboModal(): void {
    this.comboService.confirmAddTimeComputerRecord(this.client);
  }
}
