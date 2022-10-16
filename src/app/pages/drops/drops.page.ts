import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectCards } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCards]);

@Component({
  selector: 'app-drops',
  templateUrl: './drops.page.html',
  styleUrls: ['./drops.page.scss'],
})
export class DropsPage implements OnInit {

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  
  constructor() { }

  btn1: any = false;
  btn2: any = true;
  btn3: any = false;

  readyDrop: any = false;
  activeDrop: any = false;

  lastDrop: any = new Date( Date.now() - 1000 * (60 * 15) )
  now: any = new Date()
  remaining: any = "0 minutes 00 secs"
  ms: any

  ngOnInit() {
    
    setInterval(() => {
      this.timerUpdate();
    }, 1000);

  } 

  grabCard(){
    alert("Grabbed Card: " + this.swiper.swiperRef.activeIndex)
    this.activeDrop = false
    this.readyDrop = false
    this.lastDrop = new Date()
  }

  timerUpdate(){
    this.now = new Date()
    var ms = this.now - this.lastDrop
    if (ms > 900000){
      this.readyDrop = true
    }
    else{
      this.readyDrop = false
      this.millisToMinutesAndSeconds(900000 - ms)
    }
  }

  activateDrop(){
    this.activeDrop = true;
    //document.getElementById
  }

  async millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    var _seconds: number = +seconds;
    this.remaining = minutes + " minutes " + (_seconds < 10 ? '0' : '') + seconds + " secs";
  }

  onSlideChange() {
    switch (this.swiper.swiperRef.activeIndex) {
      case 0:
        this.btn1 = true
        this.btn2 = false
        this.btn3 = false
        break;
      case 1:
        this.btn1 = false
        this.btn2 = true
        this.btn3 = false
        break;
      case 2:
        this.btn1 = false
        this.btn2 = false
        this.btn3 = true
        break;
      default:
        this.btn1 = false
        this.btn2 = false
        this.btn3 = false
        break;
    }
  }

}
