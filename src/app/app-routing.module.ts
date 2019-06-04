import { ErrorPageComponent } from './error-page/error-page.component';
import { DetailsViewComponent } from './details-view/details-view.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from './list-view/list-view.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'home', component: HomeComponentComponent },
  { path: 'list/:region', component: ListViewComponent },
  { path: 'details/:country', component: DetailsViewComponent },
  { path: 'error', component: ErrorPageComponent },

  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
