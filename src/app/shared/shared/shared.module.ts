import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CatCardComponent } from '../components/cat-card/cat-card.component';

@NgModule({
  declarations: [CatCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [CatCardComponent]
})
export class SharedModule {}