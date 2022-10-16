import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public router: Router, public auth: AuthService) { }

  email_input: string;
  username_input: string;
  discord_id_input: string;
  password_input: string;

  ngOnInit() {
  }

  login(){
    this.router.navigate(["login"])
  }

  signUp(){
    var email = this.email_input
    var username = this.username_input
    var discord = this.discord_id_input
    var pwd = this.password_input
    if (email !== "" && discord !== "" && username !== "" && pwd !== "" && email !== undefined && discord !== undefined && username !== undefined && pwd !== undefined){
       this.auth.createUserWithEmailAndPassword(email, pwd, username, discord)
    }
  }

}
