import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedsPage } from './breeds.page';

const routes: Routes = [
  {
    path: '',
    component: BreedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreedsPageRoutingModule {}