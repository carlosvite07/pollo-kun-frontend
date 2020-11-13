import { Component, OnInit } from '@angular/core';
import { Emergency } from './emergency.model';
import { EmergenciesService } from './emergencies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = false;
  showEmergencySended: boolean = false;
  constructor(private emergenciesService: EmergenciesService) {}

  ngOnInit() {}

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }

  emergency(): void {
    let now = new Date();
    let newClient = {
      date: now
    } as Emergency;
    this.emergenciesService.create(newClient);
    this.showEmergencySended = true;
    setTimeout( () => { this.showEmergencySended = false }, 5000 );
  }


}
