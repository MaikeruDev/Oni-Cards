import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropsPageRoutingModule } from './drops-routing.module';

import { DropsPage } from './drops.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

import { SwiperModule } from 'swiper/angular';

import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropsPageRoutingModule,
    HeaderComponentModule,
    SwiperModule,
    CountdownModule 
  ],
  declarations: [DropsPage]
})
export class DropsPageModule {}
