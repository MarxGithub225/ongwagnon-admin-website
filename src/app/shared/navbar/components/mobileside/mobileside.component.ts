import { Component, OnInit } from '@angular/core';
import { navBarConfig } from 'src/assets/config/general';

@Component({
  selector: 'app-mobileside',
  templateUrl: './mobileside.component.html',
  styleUrls: ['./mobileside.component.scss']
})
export class MobilesideComponent implements OnInit {

  appConfig = {
    navBarConfig
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
