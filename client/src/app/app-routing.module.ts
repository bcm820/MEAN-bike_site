import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { BrowseComponent } from './components/browse/browse.component';
import { ListingsComponent } from './components/listings/listings.component';

const routes: Routes = [
  {path:'', pathMatch:'full', component: SplashComponent},
  {path:'browse', component: BrowseComponent},
  {path:'listings', component: ListingsComponent},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
