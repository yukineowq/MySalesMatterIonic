import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'browseAllListings',
    loadChildren: () => import('./browse-all-listings/browse-all-listings.module').then(m => m.BrowseAllListingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews-written',
    loadChildren: () => import('./reviews-written/reviews-written.module').then( m => m.ReviewsWrittenPageModule)
  },
  {
    path: 'reviews-received',
    loadChildren: () => import('./reviews-received/reviews-received.module').then( m => m.ReviewsReceivedPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
