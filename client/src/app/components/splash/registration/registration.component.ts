import { Component, OnInit, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subject } from 'Rxjs';
import { Router } from '@angular/router';

import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  email$ = new Subject(); // for email input search
  user = new User(); // form model
  unique; // bool for unique email
  flashes; // server-side validations
  subscription;

  constructor(
    private _as: AuthService,
    private _router: Router
  ){}
  
  ngOnInit(){
    this.unique = true;
    this.flashes = false;
    this.checkEmail();
  }
  
  // update email input search
  updateEmail(email){
    if(email === ''){ return }
    this.email$.next(email);
  }
  
  // check if email already in DB
  checkEmail(){
    this.subscription = this._as.checkEmail(this.email$)
      .subscribe(result => {
      if(result === 1){ this.unique = false; }
      else { this.unique = true; }
    });
  }
  
  // register and auto-login
  register(){
    this.subscription = this._as.register(this.user)
      .subscribe(res => {
        if(Array.isArray(res)){ this.flashes = res; }
        else {
          this._as.login(this.user);
          this._router.navigate(['browse']);
          this.user = new User();
        }
      });
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
