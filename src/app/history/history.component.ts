import {Component, OnInit} from '@angular/core';
import {MainService} from '../Services/main.service';
import {Orders} from '../Models/Orders';
import {Food} from '../Models/Food';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  orders: Orders[];

  constructor(private  service: MainService) {
  }

  ngOnInit() {
    this.service.getHistory().subscribe((res) => {
      this.orders = res;
      for (const order of this.orders) {
        order.foods = this.findquantity(order.foods);
        order.foods = this.remove_duplicates(order.foods);
      }
    });
  }

  getTotal(foods): number {
    let total: number = 0;
    foods.forEach((food) => {
      total += (food.price * food.quantity);
    });
    return total;
  }


  remove_duplicates(res: Food[]): Food[] {
    const usedObjects = {};
    for (let m = res.length - 1; m >= 0; m--) {
      const so = JSON.stringify(res[m]);
      if (usedObjects[so]) {
        res.splice(m, 1);
      } else {
        usedObjects[so] = true;
      }
    }
    return res;
  }

  findquantity(res: Food[]): Food[] {
    let m = 0;
    for (let i = 0; i < res.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (res[i].id === res[j].id) {
          m++;
        }
      }
      res[i].quantity = m;
      m = 0;
    }
    return res;
  }

}
