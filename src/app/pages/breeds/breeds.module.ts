import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BreedsPageRoutingModule } from './breeds-routing.module';
import { BreedsPage } from './breeds.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreedsPageRoutingModule,
    SharedModule
  ],
  declarations: [BreedsPage]
})
export class BreedsPageModule {}
