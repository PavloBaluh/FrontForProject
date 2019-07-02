import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppModule} from '../app.module';
import {FormsModule} from '@angular/forms';
import {AdminMainComponent} from './admin-main/admin-main.component';
import {RouterModule, Routes} from '@angular/router';
import {AddItemComponent} from './add-item/add-item.component';
import {DeleteItemComponent} from './delete-item/delete-item.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {GraphicsComponent} from './graphics/graphics.component';
import {ChartsModule} from 'ng2-charts';

const routes: Routes = [
  {
    path: 'adminMain', component: AdminMainComponent, children: [
      {path: 'addItem', component: AddItemComponent},
      {path: 'deleteItem', component: DeleteItemComponent},
      {path: 'statistics', component: StatisticsComponent},
      {path: 'graphics', component: GraphicsComponent}
    ]
  },
];

@NgModule({
  declarations: [ AdminMainComponent, AddItemComponent, DeleteItemComponent, StatisticsComponent, GraphicsComponent],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule {
}
