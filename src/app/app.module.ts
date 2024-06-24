import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitComponent } from './modules/init/init.component';
import { ListCarComponent } from './modules/list-car/list-car.component';
import { CarService } from './services/car-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewEditCarComponent } from './modules/new-edit-car/new-edit-car.component';
import { ClientsComponent } from './modules/clients/clients.component';
import { ClientService } from './services/client-service';

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    ListCarComponent,
    NewEditCarComponent,
    ClientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // modulo para trabajar con apis
    FormsModule, // modulo para trabajar con inputs(formulario)
    ReactiveFormsModule
  ],
  providers: [CarService, ClientService], // por cada nuevo servicio se agrega a providers
  bootstrap: [AppComponent]
})
export class AppModule { }
