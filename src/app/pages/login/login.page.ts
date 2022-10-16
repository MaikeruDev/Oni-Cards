import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public router: Router, public auth: AuthService) { }

  email: any;
  password: any;

  ngOnInit() {
  }

  signIn(){
    this.auth.signInWithEmailAndPassword(this.email, this.password)
  }

  register(){
    this.router.navigate(["register"])
  }

  forgotPassword(){
    this.router.navigate(["forgot-password"])
  }

}
