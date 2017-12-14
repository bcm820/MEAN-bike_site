
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user;
  
  constructor(
    private _as: AuthService,
    private _router: Router
  ){}

  ngOnInit(){
    this._as.updateUser();
    this._as.user$.subscribe(user => {
      this.user = user;
    });
  }

  logout(){
    this._as.logout()
      .subscribe(res => {
        this._as.updateUser();
        console.log('User logged out')
        this._router.navigate([''])
      });
  }

}
