import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RestorauntComponent} from './restoraunt/restoraunt.component';
import {CurentComponent} from './curent/curent.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'restaurant', component: RestorauntComponent},
  {path: 'restaurant/:name', component: CurentComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RestorauntComponent,
    CurentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
