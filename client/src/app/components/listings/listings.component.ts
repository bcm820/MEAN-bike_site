import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  
  user;
  
  constructor(
    private _as: AuthService,
    private _router: Router
  ){}

  ngOnInit() {
    this._as.updateUser();
    this._as.user$.subscribe(user => {
      this.user = user;
      this.authenticate();
    })
  }

  authenticate(){
    if(this.user === false){
      this._router.navigate([''])
    }
  }

}
