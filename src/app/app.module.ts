import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule, ModalModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ListViewComponent } from './list-view/list-view.component';
import { DetailsViewComponent } from './details-view/details-view.component';
import { HttpClientModule } from '@angular/common/http';
import { WorldMapComponent } from './world-map/world-map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { ErrorPageComponent } from './error-page/error-page.component';

// import { FontAwesomeModule } from 'angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    ListViewComponent,
    DetailsViewComponent,
    WorldMapComponent,
    ErrorPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDQ1ZoClJB3dXTG_-yFTblTpQgVk29ITO8'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
