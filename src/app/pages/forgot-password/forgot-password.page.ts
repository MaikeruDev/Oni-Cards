import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(public router: Router, public auth: AuthService) { }

  email_input: string;

  ngOnInit() {
  }

  login(){
    this.router.navigate(["login"])
  }

  reset(){
    var email = this.email_input
    if (email !== "" && email !== undefined){
       this.auth.resetPW(email)
    }
  }

}
