import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherPageRoutingModule } from './other-routing.module';

import { OtherPage } from './other.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherPageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [OtherPage]
})
export class OtherPageModule {}
