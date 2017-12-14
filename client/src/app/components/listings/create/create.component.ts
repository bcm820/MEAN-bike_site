import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Bike } from '../../../models/bike.model';
import { BikeService } from '../../../services/bike.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  bike = new Bike();
  flashes;
  
  constructor() { }

  ngOnInit() {
  }

}
