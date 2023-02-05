import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { EffectCards, Swiper } from "swiper";

SwiperCore.use([EffectCards]);

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  
  constructor() { }

  ngOnInit() {  
    
  }

  onSlideChange(){

  }

}
