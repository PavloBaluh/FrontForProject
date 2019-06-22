import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppModule} from '../app.module';
import {FormsModule} from '@angular/forms';
import {AdminMainComponent} from './admin-main/admin-main.component';
import {RouterModule, Routes} from '@angular/router';
import {AddItemComponent} from './add-item/add-item.component';
import {DeleteItemComponent} from './delete-item/delete-item.component';
import {StatisticsComponent} from './statistics/statistics.component';


const routes: Routes = [
  {
    path: 'adminMain', component: AdminMainComponent, children: [
      {path: 'addItem', component: AddItemComponent},
      {path: 'deleteItem', component: DeleteItemComponent},
      {path: 'statistics', component: StatisticsComponent}
    ]
  },
];

@NgModule({
  declarations: [AdminMainComponent, AddItemComponent, DeleteItemComponent, StatisticsComponent],
  imports: [
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
