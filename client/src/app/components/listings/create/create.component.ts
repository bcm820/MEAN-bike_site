import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Bike } from '../../../models/bike.model';
import { AuthService } from '../../../services/auth.service';
import { BikeService } from '../../../services/bike.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  bike = new Bike();
  user;
  flashes;
  
  constructor(
    private _as: AuthService,
    private _bs: BikeService
  ) { }

  ngOnInit() {
    this._as.user$.subscribe(user => {
      this.user = user;
    })
  }

  create(){
    this.bike.owner = this.user.first;
    this.bike.email = this.user.email;
    this._bs.create(this.bike)
      .subscribe(result => {
        if(Array.isArray(result)){ this.flashes = result; }
        else { this.bike = new Bike(); }
      })
  }

}
