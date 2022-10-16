import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.page.html',
  styleUrls: ['./other.page.scss'],
})
export class OtherPage implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.signOut()
  }

}
