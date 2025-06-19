import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'breeds',
    pathMatch: 'full'
  },
  {
    path: 'breeds',
    loadChildren: () => import('./pages/breeds/breeds.module').then( m => m.BreedsPageModule)
  },
  {
    path: 'breed-detail',
    loadChildren: () => import('./pages/breed-detail/breed-detail.module').then( m => m.BreedDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
