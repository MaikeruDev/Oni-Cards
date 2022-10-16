import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }

  @Input() page: any

  ngOnInit() {
  }
  
  isPage(page){
    return page == this.page
  }

  routeTo(path){
    this.router.navigate(["/" + path])
  }

}
