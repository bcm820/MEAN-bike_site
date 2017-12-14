import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'Rxjs';
import { Subject } from 'Rxjs';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // attempts$ = new BehaviorSubject(0); // if 5, block access 1 hr
  email$ = new Subject();
  user = {email:'', _pw:''};
  flash;
  subscription;
  
  constructor(
    private _as: AuthService,
    private _router: Router
  ){}
  
  ngOnInit(){
    this.flash = false;
  }

  login(){
    this._as.login(this.user)
      .subscribe(
        res => {
          this._as.updateUser();
          console.log('User logged in');
          this._router.navigate(['browse']);
        },
        err => this.flash = err.error
      );
  }

}
