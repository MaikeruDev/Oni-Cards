import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  signIn(){
    
  }

  register(){
    this.router.navigate(["register"])
  }

  forgotPassword(){
    this.router.navigate(["forgot-password"])
  }

}
