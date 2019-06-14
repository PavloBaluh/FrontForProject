import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RestorauntComponent} from './restoraunt/restoraunt.component';
import {CurentComponent} from './curent/curent.component';
import {MainComponent} from './main/main.component';
import {RegisterComponent} from './register/register.component';
import {BasketComponent} from './basket/basket.component';
import {ProfileComponent} from './profile/profile.component';
import {InfoComponent} from './info/info.component';
import {Ng2CarouselamosModule} from 'ng2-carouselamos';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HistoryComponent} from './history/history.component';
import {AdminModule} from './admin/admin.module';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'restaurant', component: RestorauntComponent},
  {path: 'restaurant/:name', component: CurentComponent},
  {path: '', component: MainComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'info', component: InfoComponent},
  {path: 'history', component: HistoryComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RestorauntComponent,
    CurentComponent,
    MainComponent,
    RegisterComponent,
    BasketComponent,
    ProfileComponent,
    InfoComponent,
    HistoryComponent,
  ],
  imports: [
    NgbModule,
    Ng2CarouselamosModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
