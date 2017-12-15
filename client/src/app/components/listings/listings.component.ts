import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  
  user;
  userBikes;
  
  constructor(
    private _as: AuthService,
    private _bs: BikeService,
    private _router: Router
  ){}

  ngOnInit() {
    this._as.updateUser();
    this._as.user$.subscribe(user => {
      this.user = user;
      this.authenticate();
      this.getBikes();
    })
  }

  authenticate(){
    if(this.user === false){
      this._router.navigate([''])
    }
  }

  getBikes(){
    this._bs.byEmail(this.user.email)
    .subscribe(bikes => this.userBikes = bikes);
  }

}
