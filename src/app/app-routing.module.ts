import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCarComponent } from './modules/list-car/list-car.component';
import { InitComponent } from './modules/init/init.component';
import { NewEditCarComponent } from './modules/new-edit-car/new-edit-car.component';
import { ClientsComponent } from './modules/clients/clients.component';

const routes: Routes = [
  { path: 'init', component: InitComponent },
  { path: 'list-car', component: ListCarComponent },
  { path: 'new-edit-car/:codigo', component: NewEditCarComponent },
  { path: 'register-client', component: ClientsComponent },
  { path: '', redirectTo: 'init', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }