import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialPageRoutingModule } from './social-routing.module';

import { SocialPage } from './social.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialPageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [SocialPage]
})
export class SocialPageModule {}
