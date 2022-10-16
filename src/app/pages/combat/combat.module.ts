import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CombatPageRoutingModule } from './combat-routing.module';

import { CombatPage } from './combat.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CombatPageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [CombatPage]
})
export class CombatPageModule {}
