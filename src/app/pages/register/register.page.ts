import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public router: Router, public auth: AuthService, public http: HttpClient) { }

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
    this.http.get("http://localhost:8081/userValidation/" + discord).subscribe(async (data: any) => {
      if (email === "" || discord === "" || username === "" || pwd === "" || email === undefined || discord === undefined || username === undefined || pwd === undefined){
        this.auth.alert("Missing Inputs","","Make sure that every field is filled and try again.", "OK")
      }
      else if (data.id == null){
        this.auth.alert("Wrong Discord ID","","We could not find a Discord User with this ID. Please check your input.", "OK")
      }
      else{
        this.auth.createUserWithEmailAndPassword(email, pwd, username, discord, data.displayAvatarURL)
      }
    })
  }

}
